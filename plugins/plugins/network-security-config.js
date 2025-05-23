const { withAndroidManifest } = require('@expo/config-plugins');
const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

const withNetworkSecurityConfig = (config, { domain }) => {
  return withAndroidManifest(config, async (config) => {
    const resDir = path.join(config.modRequest.platformProjectRoot, 'android/app/src/main/res/xml');

    if (!fs.existsSync(resDir)) {
      await fsPromises.mkdir(resDir, { recursive: true });
    }

    const networkSecurityConfigContent = `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
  <domain-config cleartextTrafficPermitted="true">
    <domain includeSubdomains="true">${domain}</domain>
  </domain-config>
</network-security-config>`;

    await fsPromises.writeFile(
      path.join(resDir, 'network_security_config.xml'),
      networkSecurityConfigContent,
      'utf8'
    );

    const androidManifestPath = path.join(config.modRequest.platformProjectRoot, 'android/app/src/main/AndroidManifest.xml');
    const androidManifest = fs.readFileSync(androidManifestPath, 'utf8');
    const updatedManifest = androidManifest.replace(
      /<application/g,
      `<application android:networkSecurityConfig="@xml/network_security_config"`
    );

    await fsPromises.writeFile(androidManifestPath, updatedManifest, 'utf8');

    return config;
  });
};

module.exports = withNetworkSecurityConfig;