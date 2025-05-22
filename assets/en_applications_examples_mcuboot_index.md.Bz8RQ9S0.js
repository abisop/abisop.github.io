import{_ as t,c as o,al as n,o as a}from"./chunks/framework.NFAqBSgQ.js";const m=JSON.parse('{"title":"mcuboot MCUboot examples","description":"","frontmatter":{},"headers":[],"relativePath":"en/applications/examples/mcuboot/index.md","filePath":"en/applications/examples/mcuboot/index.md"}'),i={name:"en/applications/examples/mcuboot/index.md"};function s(c,e,d,r,p,u){return a(),o("div",null,e[0]||(e[0]=[n(`<h1 id="mcuboot-mcuboot-examples" tabindex="-1"><code>mcuboot</code> MCUboot examples <a class="header-anchor" href="#mcuboot-mcuboot-examples" aria-label="Permalink to &quot;\`mcuboot\` MCUboot examples&quot;">​</a></h1><h2 id="swap-test" tabindex="-1"><code>swap_test</code> <a class="header-anchor" href="#swap-test" aria-label="Permalink to &quot;\`swap_test\`&quot;">​</a></h2><h3 id="description" tabindex="-1">Description <a class="header-anchor" href="#description" aria-label="Permalink to &quot;Description&quot;">​</a></h3><p>MCUboot Swap Image is an application to demonstrate firmware upgrade using internal flash memory. It simulate MCUboot API steps to switch between two valid images.</p><p>This application add 3 Builtin Apps to NuttX NSH: version, set_img and confirm. After application is build and <code>nuttx.bin</code> be generated, the binary must be signed. Consult your board documentation page to get instructions how to do it.</p><h4 id="how-to-build-and-flash" tabindex="-1">How to build and flash <a class="header-anchor" href="#how-to-build-and-flash" aria-label="Permalink to &quot;How to build and flash&quot;">​</a></h4><p>First step is build your board configuration using <code>mcuboot-loader</code> as target. That create the bootloader itself. The <code>nuttx.bin</code> must be flash as usual.</p><p>After that, clean up environment and set <code>mcuboot-swap-test</code> as target. The build output will generate the <code>nuttx.bin</code> file. You should execute the MCUboot script called <code>imgtool.py</code> and sign the binary file two times.</p><p>The first time you will use <code>--version 1.0.0</code> and <code>signedv1.bin</code> as output file. Then, the second sign you need change to <code>--version 2.0.0</code> and <code>signedv2.bin</code> as output file.</p><p>The <code>signedv1.bin</code> file must be at MCUboot Slot-0 partition and <code>signedv2.bin</code> at Slot-1.</p><p>More instructions about how to sign and flash can be found at board documentation page.</p><h4 id="running-swap-image-test" tabindex="-1">Running swap image test <a class="header-anchor" href="#running-swap-image-test" aria-label="Permalink to &quot;Running swap image test&quot;">​</a></h4><p>Open you terminal and reboot your board. You can see a similar output as below. You can check builtin apps using command <code>?</code>:</p><pre><code>*** Booting MCUboot build 7c890f4b075aed73e4c825ccf875b2fb9ebf2ded ***
NuttShell (NSH) NuttX-10.2.0
nsh&gt; ?
help usage:  help [-v] [&lt;cmd&gt;]

  .         cd        echo      hexdump   mv        rmdir     true      xd
  [         cp        exec      kill      printf    set       truncate
  ?         cmp       exit      ls        ps        sleep     uname
  basename  dirname   false     mkdir     pwd       source    umount
  break     dd        free      mkrd      reboot    test      unset
  cat       df        help      mount     rm        time      usleep

Builtin Apps:
  mcuboot_set_img  mcuboot_confirm  sh
  mcuboot_version  ramtest          nsh
nsh&gt;
</code></pre><p>First step (check version):</p><pre><code>nsh&gt; mcuboot_version
Image version 1.0.0.0
nsh&gt;
</code></pre><p>Second step (mark image as good because it is running). This is an optional step that must be executed if you ran <code>imgtool.py</code> without optional parameter <code>--confirm</code>:</p><pre><code>nsh&gt; mcuboot_confirm
Application Image successfully confirmed!
nsh&gt;
</code></pre><p>Third step (let&#39;s reboot and see what&#39;s happen):</p><pre><code>nsh&gt; reboot
*** Booting MCUboot build 7c890f4b075aed73e4c825ccf875b2fb9ebf2ded ***
NuttShell (NSH) NuttX-10.2.0
nsh&gt; mcuboot_version
Image version 1.0.0.0
nsh&gt;
</code></pre><p>Fourth step (let&#39;s switch image):</p><pre><code>nsh&gt; mcuboot_set_img
Requested update for next boot. Restarting...
*** Booting MCUboot build 7c890f4b075aed73e4c825ccf875b2fb9ebf2ded ***
NuttShell (NSH) NuttX-10.2.0
nsh&gt; mcuboot_version
Image version 2.0.0.0
nsh&gt;
</code></pre><p>Now, we switched from image version 1.0.0 to image 2.0.0. However, we intentionally will not run <code>mcuboot_confirm</code> app:</p><pre><code>nsh&gt; reboot
*** Booting MCUboot build 7c890f4b075aed73e4c825ccf875b2fb9ebf2ded ***
NuttShell (NSH) NuttX-10.2.0
nsh&gt; mcuboot_version
Image version 1.0.0.0
nsh&gt;
</code></pre><p>This means that if for any reason App reboot, have a malfunctioning or not boot, MCUboot will switch back to old <code>good</code> image! Remember that we executed <code>mcuboot_confirm</code> at step two.</p><p>Fifth step (switch to image version 2 and mark as permanent):</p><pre><code>nsh&gt; mcuboot_set_img
Requested update for next boot. Restarting...
*** Booting MCUboot build 7c890f4b075aed73e4c825ccf875b2fb9ebf2ded ***
NuttShell (NSH) NuttX-10.2.0
nsh&gt; mcuboot_confirm
Application Image successfully confirmed!
nsh&gt; mcuboot_version
Image version 2.0.0.0
nsh&gt;
</code></pre><p>Sixth step (Reboot and confirm V2 image):</p><pre><code>nsh&gt; reboot
*** Booting MCUboot build 7c890f4b075aed73e4c825ccf875b2fb9ebf2ded ***
NuttShell (NSH) NuttX-10.2.0
nsh&gt; mcuboot_version
Image version 2.0.0.0
nsh&gt;
</code></pre><p>Conclusion, once we boot a newer image and confirm it MCUboot always run that image, unless you instruct it to swap again!</p>`,30)]))}const b=t(i,[["render",s]]);export{m as __pageData,b as default};
