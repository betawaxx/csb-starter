import { serve, build } from "esbuild";
// import { glsl } from "esbuild-plugin-glsl";

/* - Setup */
const env = process.env.NODE_ENV;
const production = env === "production";

const FILES = {
  entry: ["index.js"],
  out: "build",
};

const SETTINGS = {
  bundle: true,
  sourcemap: !production,
  loader: { ".png": "dataurl" },
  loader: { ".webp": "dataurl" },
};

/* -- Plugins */
const PLUGINS = [
  //   glsl({
  //     minify: production,
  //   }),
];

/* --- DEVELOPMENT */
function serveDev() {
  serve(
    {
      port: 8000,
      servedir: "dist",
    },
    {
      entryPoints: FILES.entry,
      outdir: "dist",
      ...SETTINGS,
      plugins: PLUGINS,
    }
  ).then((server) => {
    console.log(`↑DEV ↑`);
    console.log("http://localhost:8000/dev.js");
    //   server.stop();
  });
}

/* --- DEVELOPMENT */
function serveFile() {
  serve(
    {
      port: 8000,
    },
    {
      entryPoints: FILES.entry,
      outfile: "dev.js",
      ...SETTINGS,
      plugins: PLUGINS,
    }
  ).then((server) => {
    console.log("http://localhost:8000/dev.js");
    //   server.stop();
  });
}

/* --- BUILD */
function buildJs() {
  build({
    entryPoints: FILES.entry,
    outdir: FILES.out,
    ...SETTINGS,
    plugins: PLUGINS,
  }).then((stats) => {
    console.log(stats);
  });
}

/* ------ Run! */
if (production) {
  buildJs();
} else if (env === "flow") {
  serveFile();
} else {
  serveDev();
}

/*
.package.json 

  "type": "module",
  "scripts": {
    "dev": "NODE_ENV=dev node esbuild.config.js",
    "build": "NODE_ENV=production node esbuild.config.js",
    "flow": "NODE_ENV=flow node esbuild.config.js"
  },
  
*/
