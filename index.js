////////////////////////////////////
// WCR entry point.
//

// Express modules/configuration:
const Express = require("express");
const serveIndex = require("serve-index");
const serveFavicon = require("serve-favicon");
const path = require("path");
const PublicFolder = path.join(__dirname,
    "public");
const Port = process.env.PORT || 80;

// Run the application in async IIFE.
(async () => {

    try {

        // Allocate express application object and configure it.
        Express()

        // Enable static- and folder- web server functionality.
        .use("/", Express.static(PublicFolder),
            serveIndex(PublicFolder, {

                    "icons": true
                }))

        /* Favicon handling.
        .use(serveFavicon(path.join(PublicFolder,
            "media",
            "favicon.ico")))*/

        // Start express listening on the specific port.
        .listen(Port, () => {

            console.log(`Listening on ${Port}.`);
        });
    } catch (e) {

        console.dir(`Error: ${e.message}.`, { colors: true });
    }
})();
