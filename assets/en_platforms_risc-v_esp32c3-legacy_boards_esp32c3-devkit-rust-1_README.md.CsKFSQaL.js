import{_ as t,c as r,al as a,o as s}from"./chunks/framework.NFAqBSgQ.js";const u=JSON.parse('{"title":"README","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/risc-v/esp32c3-legacy/boards/esp32c3-devkit-rust-1/README.md","filePath":"en/platforms/risc-v/esp32c3-legacy/boards/esp32c3-devkit-rust-1/README.md"}'),o={name:"en/platforms/risc-v/esp32c3-legacy/boards/esp32c3-devkit-rust-1/README.md"};function n(i,e,c,p,d,l){return s(),r("div",null,e[0]||(e[0]=[a(`<h1 id="readme" tabindex="-1">README <a class="header-anchor" href="#readme" aria-label="Permalink to &quot;README&quot;">​</a></h1><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>Initial port to ESP32C3-Devkit-RUST-1 board: <a href="https://github.com/esp-rs/esp-rust-board" target="_blank" rel="noreferrer">https://github.com/esp-rs/esp-rust-board</a></p><p>Testing -------</p><pre><code>$ ./tools/configure.sh esp32c3-devkit-rust-1:nsh
$ make
$ make flash ESPTOOL_PORT=/dev/ttyACM0
</code></pre><p>Alternatively you can compile and flash faster this way:</p><pre><code>$ make -j flash ESPTOOL_PORT=/dev/ttyACM0
</code></pre><p>After flashing NuttX in this board use minicom or other serial console configured to:</p><pre><code>Device: /dev/ttyACM0
Baudrate: 9600 8n1
</code></pre><p>If everything is fine you should be able to get the serial console:</p><pre><code>nsh&gt; uname -a
NuttX 10.4.0 55df6e951e-dirty Aug 22 2022 17:12:29 risc-v esp32c3-devkit-rust-1

nsh&gt; mount
  /proc type procfs

nsh&gt; free
                   total       used       free    largest  nused  nfree
        Umem:     377872       5792     372080     372080     30      1
nsh&gt;
</code></pre>`,11)]))}const f=t(o,[["render",n]]);export{u as __pageData,f as default};
