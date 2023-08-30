import type { Handler } from 'hono'

export default function geo(): Handler {
  return async (ctx) => {
    const geo = ctx.req.raw.cf || {}

    let html_content = ''

    html_content += `<p>Colo: ${geo.colo}</p>`
    html_content += `<p>Country: ${geo.country}</p>`
    html_content += `<p>City: ${geo.city}</p>`
    html_content += `<p>Continent: ${geo.continent}</p>`
    html_content += `<p>Latitude: ${geo.latitude}</p>`
    html_content += `<p>Longitude: ${geo.longitude}</p>`
    html_content += `<p>PostalCode: ${geo.postalCode}</p>`
    html_content += `<p>MetroCode: ${geo.metroCode}</p>`
    html_content += `<p>Region: ${geo.region}</p>`
    html_content += `<p>RegionCode: ${geo.regionCode}</p>`
    html_content += `<p>Timezone: ${geo.timezone}</p>`

    let html = `<!DOCTYPE html>
      <head>
        <title>Geolocation: Hello World!</title>
        <style>body{padding:6em; font-family: sans-serif;} h1{color:#f6821f;}</style>
      </head>
      <body>
        <h1>Geolocation: Hello World!</h1>
        ${html_content}
      </body>`

    return new Response(html, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
      },
    })
  }
}