const { JSDOM } = require("jsdom");

const loadAppVersionAndroid = async (linkPlayStore) => {
  const response = await fetch(linkPlayStore);
  const html = await response.text();

  const dom = new JSDOM(html);
  const scripts = Array.from(dom.window.document.querySelectorAll("script"));
  const script = scripts.find(
    (script) =>
      script.textContent && script.textContent.includes("/store/apps/developer")
  );
  const versionStringRegex = /"[0-9]+\.[0-9]+\.[0-9.]+"/g;
  const [match] = script.textContent.match(versionStringRegex);
  const version = match.replace(/"/g, "");

  return version;
};

const loadAppVersionIOS = async (linkAppStore) => {
  const response = await fetch(linkAppStore);
  const html = await response.text();

  const dom = new JSDOM(html);
  const document = dom.window.document;
  const version = document
    .querySelector(".whats-new__latest__version")
    .textContent.replace("Version ", "")
    .replace("Versão ", "");

  return version;
};

loadAppVersionAndroid(
  "https://play.google.com/store/apps/details?id=br.com.orulo"
).then((version) => console.log("android:", version));

loadAppVersionIOS(
  "https://apps.apple.com/br/app/%C3%B3rulo-para-corretores/id1456070833"
).then((version) => console.log("IOS:", version));
