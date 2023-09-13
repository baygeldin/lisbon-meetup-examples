import type { Handler } from 'hono'

export default function geo (): Handler {
  return async (ctx) => {
    // eslint-disable-next-line
    const geo = (ctx.req.raw.cf || {}) as IncomingRequestCfProperties

    let htmlContent = ''

    /* eslint-disable @typescript-eslint/restrict-template-expressions */
    htmlContent += `<p>Colo: ${geo.colo}</p>`
    htmlContent += `<p>Country: ${geo.country}</p>`
    htmlContent += `<p>City: ${geo.city}</p>`
    htmlContent += `<p>Continent: ${geo.continent}</p>`
    htmlContent += `<p>Latitude: ${geo.latitude}</p>`
    htmlContent += `<p>Longitude: ${geo.longitude}</p>`
    htmlContent += `<p>PostalCode: ${geo.postalCode}</p>`
    htmlContent += `<p>MetroCode: ${geo.metroCode}</p>`
    htmlContent += `<p>Region: ${geo.region}</p>`
    htmlContent += `<p>RegionCode: ${geo.regionCode}</p>`
    htmlContent += `<p>Timezone: ${geo.timezone}</p>`
    /* eslint-enable @typescript-eslint/restrict-template-expressions */

    const html = `<!DOCTYPE html>
      <head>
        <title>Geolocation: Hello World!</title>
        <style>body{padding:6em; font-family: sans-serif;} h1{color:#f6821f;}</style>
      </head>
      <body>
        <h1>Geolocation: Hello World!</h1>
        ${htmlContent}
      </body>`

    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8'
      }
    })
  }
}
