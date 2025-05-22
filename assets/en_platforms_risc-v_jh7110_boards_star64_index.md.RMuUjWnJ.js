import{_ as t,c as a,al as o,o as n}from"./chunks/framework.NFAqBSgQ.js";const h=JSON.parse('{"title":"PINE64 Star64","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/risc-v/jh7110/boards/star64/index.md","filePath":"en/platforms/risc-v/jh7110/boards/star64/index.md"}'),i={name:"en/platforms/risc-v/jh7110/boards/star64/index.md"};function r(s,e,l,p,d,c){return n(),a("div",null,e[0]||(e[0]=[o(`<h1 id="pine64-star64" tabindex="-1">PINE64 Star64 <a class="header-anchor" href="#pine64-star64" aria-label="Permalink to &quot;PINE64 Star64&quot;">​</a></h1><p><a href="https://wiki.pine64.org/wiki/STAR64" target="_blank" rel="noreferrer">Star64</a> is a 64-bit RISC-V based Single Board Computer powered by StarFive JH7110 Quad-Core SiFive U74 64-Bit CPU, Imagination Technology BX-4-32 GPU and supports up to 8GB 1866MHz LPDDR4 memory.</p><p>It provides an eMMC module socket, MicroSD Card slot, PCI-e, Pi-2 Bus, USB 3.0 and many other peripheral interfaces for makers to integrate with sensors and other devices.</p><h2 id="features" tabindex="-1">Features <a class="header-anchor" href="#features" aria-label="Permalink to &quot;Features&quot;">​</a></h2><ul><li></li></ul><pre><code>**System on Chip:** StarFive JH7110

:   -   **CPU:** SiFive RISC-V U74 Application Cores (4 cores,
        RV64GCB) and SiFive RISC-V S7 Monitor Core (single core,
        RV64IMACB)
    -   **GPU:** Imagination Technology BXE-4-32
    -   **RAM:** LPDDR4 2GB / 4GB / 8GB
</code></pre><ul><li><p><strong>Video:</strong> Digital Video Output up to 4K @ 30 Hz, 4K HDR @ 60 fps</p></li><li><p><strong>Audio:</strong> 3.5mm Audio Jack</p></li><li><p><strong>Ethernet:</strong> Single or Dual 10 / 100 / 1000Mbps</p></li><li><p><strong>Wireless:</strong> 2.4 GHz / 5 Ghz MIMO WiFi 802.11 b/g/n/ac with Bluetooth 5.2 (Realtek RTL8852BU)</p></li><li><p><strong>Storage:</strong> 128 Mbit (16 MByte) XSPI NOR flash Memory, Bootable microSD (SDHC and SDXC up to 256 GB), Bootable eMMC</p></li><li><p><strong>USB:</strong> 1 x USB 3.0 Dedicated Host Port, 3 x USB 2.0 Host Ports</p></li><li><p><strong>Expansion Ports:</strong> PCIe 2.0 x 1 lane, 2 x 20 pins &quot;Pi2&quot; GPIO Header</p></li><li><p><strong>MIPI DSI Port:</strong> 4-lane MIPI DSI port for LCD Panel</p></li><li><p><strong>MIPI CSI Port:</strong> 4-lane MIPI CSI port for Camera Module</p></li></ul><h2 id="serial-console" tabindex="-1">Serial Console <a class="header-anchor" href="#serial-console" aria-label="Permalink to &quot;Serial Console&quot;">​</a></h2><p>A <strong>USB Serial Adapter</strong> (like <a href="https://pine64.com/product/serial-console-woodpecker-edition/" target="_blank" rel="noreferrer">CH340G Serial Adapter</a>) is required to run NuttX on Star64.</p><p>Connect the USB Serial Adapter to Star64&#39;s <strong>GPIO Header</strong> at:</p><p>USB Serial GPIO Header</p><hr><p>GND Pin 6 (GND) RX Pin 8 (UART0 TX) TX Pin 10 (UART0 RX)</p><p>On the USB Serial Adapter, set the <strong>Voltage Level</strong> to 3V3.</p><p>Connect Star64 to our computer with the USB Serial Adapter. On our computer, start a Serial Terminal and connect to the USB Serial Port at <strong>115.2 kbps</strong>.</p><p>NuttX will appear in the Serial Console when it boots on Star64.</p><h2 id="risc-v-toolchain" tabindex="-1">RISC-V Toolchain <a class="header-anchor" href="#risc-v-toolchain" aria-label="Permalink to &quot;RISC-V Toolchain&quot;">​</a></h2><p>Before building NuttX for Star64, download the <strong>RISC-V Toolchain riscv64-unknown-elf</strong> from <a href="https://github.com/sifive/freedom-tools/releases/tag/v2020.12.0" target="_blank" rel="noreferrer">SiFive RISC-V Tools</a>.</p><p>Add the downloaded toolchain <code>riscv64-unknown-elf-toolchain-.../bin</code> to the <code>PATH</code> Environment Variable.</p><p>Check the RISC-V Toolchain:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> riscv64-unknown-elf-gcc -v</span></span></code></pre></div><h2 id="building" tabindex="-1">Building <a class="header-anchor" href="#building" aria-label="Permalink to &quot;Building&quot;">​</a></h2><p>To build NuttX for Star64, [[in](\`in.md)stall the prerequisites &lt;/quickstart/install&gt;]{.title-ref} and [[clone the git repo](\`clone the git repo.md)sitories &lt;/quickstart/install&gt;]{.title-ref} for <code>nuttx</code> and <code>apps</code>.</p><p>Configure the NuttX project and build the project:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> cd nuttx</span></span>
<span class="line"><span> tools/configure.sh star64:nsh</span></span>
<span class="line"><span> make</span></span>
<span class="line"><span> riscv64-unknown-elf-objcopy -O binary nuttx nuttx.bin</span></span></code></pre></div><p>This produces the NuttX Kernel <code>nuttx.bin</code>. Next, build the NuttX Apps Filesystem:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> make export</span></span>
<span class="line"><span> pushd ../apps</span></span>
<span class="line"><span> tools/mkimport.sh -z -x ../nuttx/nuttx-export-*.tar.gz</span></span>
<span class="line"><span> make import</span></span>
<span class="line"><span> popd</span></span>
<span class="line"><span> genromfs -f initrd -d ../apps/bin -V &quot;NuttXBootVol&quot;</span></span></code></pre></div><p>This generates the Initial RAM Disk <code>initrd</code>.</p><p>Download the <a href="https://github.com/starfive-tech/VisionFive2/releases/download/VF2_v3.1.5/jh7110-visionfive-v2.dtb" target="_blank" rel="noreferrer">Device Tree jh7110-visionfive-v2.dtb</a> from <a href="https://github.com/starfive-tech/VisionFive2/releases" target="_blank" rel="noreferrer">StarFive VisionFive2 Software Releases</a> into the <code>nuttx</code> folder.</p><p>Inside the <code>nuttx</code> folder, create a Text File named <code>nuttx.its</code> with the following content:</p><pre><code>/dts-v1/;

/ {
  description = &quot;NuttX FIT image&quot;;
  #address-cells = &lt;2&gt;;

  images {
    vmlinux {
      description = &quot;vmlinux&quot;;
      data = /incbin/(&quot;./nuttx.bin&quot;);
      type = &quot;kernel&quot;;
      arch = &quot;riscv&quot;;
      os = &quot;linux&quot;;
      load = &lt;0x0 0x40200000&gt;;
      entry = &lt;0x0 0x40200000&gt;;
      compression = &quot;none&quot;;
    };

    ramdisk {
      description = &quot;buildroot initramfs&quot;;
      data = /incbin/(&quot;./initrd&quot;);
      type = &quot;ramdisk&quot;;
      arch = &quot;riscv&quot;;
      os = &quot;linux&quot;;
      load = &lt;0x0 0x46100000&gt;;
      compression = &quot;none&quot;;
      hash-1 {
        algo = &quot;sha256&quot;;
      };
    };

    fdt {
      data = /incbin/(&quot;./jh7110-visionfive-v2.dtb&quot;);
      type = &quot;flat_dt&quot;;
      arch = &quot;riscv&quot;;
      load = &lt;0x0 0x46000000&gt;;
      compression = &quot;none&quot;;
      hash-1 {
        algo = &quot;sha256&quot;;
      };
    };
  };

  configurations {
    default = &quot;nuttx&quot;;

    nuttx {
      description = &quot;NuttX&quot;;
      kernel = &quot;vmlinux&quot;;
      fdt = &quot;fdt&quot;;
      loadables = &quot;ramdisk&quot;;
    };
  };
};
</code></pre><p>Package the NuttX Kernel, Initial RAM Disk and Device Tree into a Flat Image Tree:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> sudo apt install u-boot-tools</span></span>
<span class="line"><span> mkimage -f nuttx.its -A riscv -O linux -T flat_dt starfiveu.fit</span></span></code></pre></div><p>The Flat Image Tree <code>starfiveu.fit</code> will be copied to a microSD Card in the next step.</p><h2 id="booting" tabindex="-1">Booting <a class="header-anchor" href="#booting" aria-label="Permalink to &quot;Booting&quot;">​</a></h2><p>NuttX boots on Star64 via a microSD Card. To prepare the microSD Card, download the <a href="https://github.com/starfive-tech/VisionFive2/releases/download/VF2_v3.1.5/sdcard.img" target="_blank" rel="noreferrer">microSD Image sdcard.img</a> from <a href="https://github.com/starfive-tech/VisionFive2/releases" target="_blank" rel="noreferrer">StarFive VisionFive2 Software Releases</a>.</p><p>Write the downloaded image to a microSD Card with <a href="https://www.balena.io/etcher/" target="_blank" rel="noreferrer">Balena Etcher</a> or <a href="https://wiki.gnome.org/Apps/Disks" target="_blank" rel="noreferrer">GNOME Disks</a>.</p><p>Copy the file <code>starfiveu.fit</code> from the previous section and overwrite the file on the microSD Card.</p><p>Check that Star64 is connected to our computer via a USB Serial Adapter.</p><p>Insert the microSD Card into Star64 and power up Star64. NuttX boots on Star64 and NuttShell (nsh) appears in the Serial Console.</p><p>To see the available commands in NuttShell:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span> help</span></span></code></pre></div><p><a href="https://lupyuen.github.io/articles/tftp" target="_blank" rel="noreferrer">Booting NuttX over TFTP</a> is also supported on Star64.</p><h2 id="configurations" tabindex="-1">Configurations <a class="header-anchor" href="#configurations" aria-label="Permalink to &quot;Configurations&quot;">​</a></h2><h3 id="nsh" tabindex="-1">nsh <a class="header-anchor" href="#nsh" aria-label="Permalink to &quot;nsh&quot;">​</a></h3><p>Basic configuration that runs NuttShell (nsh). This configuration is focused on low level, command-line driver testing. Built-in applications are supported, but none are enabled. Serial Console is enabled on UART0 at 115.2 kbps.</p><h2 id="peripheral-support" tabindex="-1">Peripheral Support <a class="header-anchor" href="#peripheral-support" aria-label="Permalink to &quot;Peripheral Support&quot;">​</a></h2><p>NuttX for Star64 supports these peripherals:</p><p>Peripheral Support NOTES</p><hr><p>UART Yes</p>`,51)]))}const g=t(i,[["render",r]]);export{h as __pageData,g as default};
