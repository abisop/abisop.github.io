import{_ as o,c as e,al as l,o as n}from"./chunks/framework.NFAqBSgQ.js";const f=JSON.parse('{"title":"wolfSSL wolfSSL SSL/TLS Cryptography Library","description":"","frontmatter":{},"headers":[],"relativePath":"en/applications/crypto/wolfssl/index.md","filePath":"en/applications/crypto/wolfssl/index.md"}'),i={name:"en/applications/crypto/wolfssl/index.md"};function r(a,t,s,p,c,u){return n(),e("div",null,t[0]||(t[0]=[l(`<div class="warning"><div class="title"><p>Warning</p></div><p>wolfSSL is GPL</p></div><h1 id="wolfssl-wolfssl-ssl-tls-cryptography-library" tabindex="-1"><code>wolfSSL</code> wolfSSL SSL/TLS Cryptography Library <a class="header-anchor" href="#wolfssl-wolfssl-ssl-tls-cryptography-library" aria-label="Permalink to &quot;\`wolfSSL\` wolfSSL SSL/TLS Cryptography Library&quot;">​</a></h1><h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-label="Permalink to &quot;Installation&quot;">​</a></h2><h3 id="installing-from-nuttx-apps" tabindex="-1">Installing from nuttx-apps <a class="header-anchor" href="#installing-from-nuttx-apps" aria-label="Permalink to &quot;Installing from nuttx-apps&quot;">​</a></h3><p>Skip to step 6</p><h3 id="installing-from-wolfssl" tabindex="-1">Installing from wolfssl <a class="header-anchor" href="#installing-from-wolfssl" aria-label="Permalink to &quot;Installing from wolfssl&quot;">​</a></h3><ol><li><p>Create working directory (e.g. ~/nuttxspace):</p><pre><code> cd ~
 mkdir nuttxspace
</code></pre></li><li><p>Install dependencies:</p><pre><code> cd ~/nuttxspace
 sudo apt install -y bison flex gettext texinfo libncurses5-dev libncursesw5-dev gperf automake libtool pkg-config build-essential gperf genromfs libgmp-dev libmpc-dev libmpfr-dev libisl-dev binutils-dev libelf-dev libexpat-dev gcc-multilib g++-multilib picocom u-boot-tools util-linux
 sudo apt install -y kconfig-frontends
 sudo apt install -y gcc-arm-none-eabi binutils-arm-none-eabi
</code></pre></li><li><p>Clone nuttx and nuttx-apps into working directory:</p><pre><code> git clone https://github.com/apache/nuttx.git nuttx
 git clone https://github.com/apache/nuttx-apps apps
</code></pre></li><li><p>Copy this directory into the working directory applications:</p><pre><code> cp -R RTOS/nuttx/wolfssl ~/nuttxspace/apps/crypto/wolfssl
</code></pre></li><li><p>Setup wolfSSL in preparation for the build, <code>WOLFSSL_DIR</code> must be the path to the original wolfssl repo:</p><pre><code> cd ~/nuttxspace/apps/crypto/wolfssl
 WOLFSSL_DIR=&lt;path-to-wolfssl-repo&gt; ./setup-wolfssl.sh
</code></pre></li><li><p>Setup baseline NuttX configuration (board + NuttX Shell):</p><pre><code> cd ~/nuttxspace/nuttx
 ./tools/configure.sh -l &lt;board&gt;:nsh

If you are using wolfSSL for TLS you should use the \`\`netnsh\`\` target if your board supports it::

  ./tools/configure.sh -l &lt;board&gt;:netnsh

EXAMPLES:

- For NuttX Simulator: \`\` ./tools/configure.sh sim:nsh\`\`
- For BL602 (RISC-V): \`\` ./tools/configure.sh -l bl602evb:nsh\`\`
- For NUCLEO-L552ZE-Q (Cortex-M33): \`\` ./tools/configure.sh -l nucleo-l552ze:nsh\`\`
- For NUCLEO-H753ZI: \`\` ./tools/configure.sh -l nucleo-h743zi:nsh\`\`
- For NUCLEO-F756ZG: \`\`./tools/configure.sh -l nucleo-144:f746-nsh\`\`
</code></pre></li><li><p>Start custom configuration system:</p><pre><code> make menuconfig
</code></pre></li><li><p>Configure NuttX to enable the wolfSSL crypto library test applications:</p><blockquote><ul><li><p>From main menu select: <strong>Application Configuration &gt; Cryptography Library Support</strong></p></li><li><p>Enable and then select <strong>wolfSSL SSL/TLS Cryptography Library</strong></p></li><li><p>Enable and then select <strong>wolfSSL applications</strong></p></li><li><p>Enable applications:</p><blockquote><ul><li><strong>wolfCrypt Benchmark application</strong></li><li><strong>wolfCrypt Test application</strong></li><li><strong>wolfSSL client and server example</strong></li></ul></blockquote></li><li><p>Select Save from bottom menu, saving to <code>.config</code> file</p></li><li><p>Exit configuration tool</p></li></ul><p>If you are using wolfSSL for TLS you should use the <code>netnsh</code> target and should enable an NTP or some for of system time keeping so that wolfSSL has the current date to check certificates. You will also need to set the right networking settings for NuttX to connect to the internet.</p></blockquote></li><li><p>Build NuttX and wolfSSL:</p><pre><code> make
</code></pre></li><li><p>Flash the target:</p><pre><code>### Simulator
./nuttx
### STM32 Targets (address may vary)
STM32_Programmer_CLI -c port=swd -d ./nuttx.bin 0x08000000
</code></pre></li><li><p>Connect to the target with a serial monitoring tool, the device on linux is usually <code>/dev/ttyACM0</code> but it may vary:</p><pre><code>minicom -D /dev/ttyACM0
</code></pre></li><li><p>Run the wolfcrypt benchmark and/or test in the NuttX Shell:</p><pre><code>nsh&gt; wolfcrypt_test
nsh&gt; wolfcrypt_benchmark
nsh&gt; wolfssl_client_server
</code></pre></li></ol><h2 id="notes" tabindex="-1">Notes <a class="header-anchor" href="#notes" aria-label="Permalink to &quot;Notes&quot;">​</a></h2><p>Developed using the following targets:</p><ul><li>STM NUCLEO-L552ZE-Q (Cortex-M33)</li><li>STM NUCLEO-H753ZI</li><li>STM NUCLEO-F756ZG</li><li>DT-BL10 / BL602 (RISC-V)</li><li>NuttX simulator</li></ul>`,10)]))}const h=o(i,[["render",r]]);export{f as __pageData,h as default};
