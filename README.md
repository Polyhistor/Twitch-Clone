# How to run the App?

First things first, get into both Application and Json-Server folders and run NPM INSTALL in order to install all the necessary dependencies.
Once done you can do:

```
NPM START
```

Once done, enjoy the applicaiton. It's a complete CRUD twitch-like app for live streaming running on React,Redux, Lodash and Json Server.

# Testing

Jest and Enzyme will be added soon to the production environment

# How to make this thing work?

Allright, it's a little bit complicated, you're going to have to have all 3 servers running in each folder (Application, Json-Server and RTMP Server), the architecture works in a way that the viewer browser will send the request to certain stream at the RTMP server, the RTMP server connects to the web server (web server knows which streams is currently being broadcasted) and then the web browser will show the contents to the user.

To start a broadcast use any OBS, go to settings of it and set it to custom, for URL choose 'rtmp://localhost/live/stream' and for stream key, choose the ID of the stream you're displaying on your web browser.

If you find any difficulty in implementing all these, email me at pouya.ataei.7@gmail.com

Cheers mates!

# Where is this project going ?

I'll be running it serverles using node on AWS or netlify pretty soon. Whether then? let the rythm be your guiding light...
