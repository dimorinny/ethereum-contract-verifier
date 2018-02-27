const cheerio = require('cheerio')
const fetch = require('node-fetch')
const ms = require('ms')

const args = require('yargs')
  .usage('Usage: $0 [options]')
  .option('delay', {
    describe: 'Delay between requests',
    default: '1.5s',
    type: 'string',
    coerce: (arg) => ms(arg)
  })
  .option('pages', {
    describe: 'Download contracts only from the specified pages',
    default: '1..last',
    type: 'string',
    coerce: (arg) => {
      const match = arg.match(/^(\d+)\.\.(\d+|last)$/)
      if (!match) throw new RangeError(`Invalid pages ${arg}`)

      const down = parseInt(match[1], 10)
      if (match[2] === 'last') return [down, 'last']

      const up = parseInt(match[2], 10)
      if (down > up) throw new RangeError(`Invalid pages ${arg}`)

      return [down, up]
    }
  })
  .help('help').alias('help', 'h')

async function delay (timeout) {
  await new Promise((resolve) => setTimeout(resolve, timeout))
}

async function getHTML (url) {
  const resp = await fetch(url)
  if (resp.status !== 200) throw new Error(`${resp.status}: ${resp.statusText}`)
  return resp.text()
}

async function getAddressesList (page) {
  const html = await getHTML(`https://etherscan.io/contractsVerified/${page}`)
  const $ = cheerio.load(html)
  return $('table tbody').first().find('tr').map((i, el) => $(el).find('a').text().toLowerCase()).get()
}

async function getContractValues (address) {
  const values = { address }

  const html = await getHTML(`https://etherscan.io/address/${address}`)
  const $ = cheerio.load(html)

  const table = $('div#ContentPlaceHolder1_contractCodeDiv table')
  values.name = $($(table[0]).find('td')[1]).text().trim()
  values.compiler = $($(table[0]).find('td')[3]).text().trim()
  values.optimizer = parseInt($($(table[1]).find('td')[3]).text().trim(), 10)

  const code = $('div#dividcode')
  values.source = code.find('pre#editor').text().trim()
  values.abi = code.find('pre#js-copytextarea2').text().trim()
  values.bin = code.find('div#verifiedbytecode2').text().trim()
  values.bzzr = code.find('.wordwrap').last().text().trim()

  return values
}

;(async () => {
  const { argv } = args

  for (let i = argv.pages[0], max = argv.pages[1] === 'last' ? Infinity : argv.pages[1]; i < max; ++i) {
    if (i > argv.pages[0]) await delay(argv.delay)

    const addresses = await getAddressesList(i)
    if (addresses.length === 0) break

    for (let j = 0; j < addresses.length; ++j) {
      if (j > 0) await delay(argv.delay)

      const address = addresses[j]
      const values = await getContractValues(address)

      // TODO
      console.log(values.name)
    }
  }
})().catch((err) => {
  console.log(err.stack || err)
  process.exit(1)
})
