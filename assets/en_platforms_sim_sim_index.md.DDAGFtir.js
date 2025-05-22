import{_ as n,c as t,al as o,o as a}from"./chunks/framework.NFAqBSgQ.js";const i="/assets/lvgl.Dczo5dpD.png",r="/assets/vnc.Dg1YmoIx.png",g=JSON.parse('{"title":"SIM","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/sim/sim/index.md","filePath":"en/platforms/sim/sim/index.md"}'),s={name:"en/platforms/sim/sim/index.md"};function l(d,e,u,c,p,m){return a(),t("div",null,e[0]||(e[0]=[o(`<h1 id="sim" tabindex="-1">SIM <a class="header-anchor" href="#sim" aria-label="Permalink to &quot;SIM&quot;">​</a></h1><p>It is possible to run NuttX in a simulator called <code>sim</code>, but some features currently are supported only on Linux host (i.e.: Bluetooth, I2C, SPI, etc).</p><p>Using <code>sim</code> you can test many of NuttX features without a supported board. Examples of supported features: Audio, Bluetooth, ELF, I2C, SPI, LVGL, Flash File System, NX Serves, NX Demos, NX Window Manager, ROMFS, Network: TCP, UDP, IP,6LoWPAN, and many more.</p><h2 id="toolchain" tabindex="-1">Toolchain <a class="header-anchor" href="#toolchain" aria-label="Permalink to &quot;Toolchain&quot;">​</a></h2><p>All you need is your machine <code>gcc</code> working.</p><h2 id="compiling" tabindex="-1">Compiling <a class="header-anchor" href="#compiling" aria-label="Permalink to &quot;Compiling&quot;">​</a></h2><p>All you need to do is select your desired board profile configuration (see: nuttx/sim/sim/sim/configs for the listing) :</p><pre><code> make distclean

 ./tools/configure.sh sim:nsh

 make
</code></pre><h2 id="running" tabindex="-1">Running <a class="header-anchor" href="#running" aria-label="Permalink to &quot;Running&quot;">​</a></h2><p>When the compilation finishes it will create a <code>nuttx</code> binary, then run it:</p><pre><code> ./nuttx 
login: admin
password: Administrator
User Logged-in!

NuttShell (NSH) NuttX-10.1.0
MOTD: username=admin password=Administrator
nsh&gt; ?
help usage:  help [-v] [&lt;cmd&gt;]

  .         cd        echo      hexdump   mkfatfs   pwd       source    unset     
  [         cp        exec      kill      mkrd      readlink  test      usleep    
  ?         cmp       exit      losetup   mount     rm        time      xd        
  basename  dirname   false     ln        mv        rmdir     true      
  break     dd        free      ls        poweroff  set       uname     
  cat       df        help      mkdir     ps        sleep     umount    

Builtin Apps:
  sh     hello  nsh    
nsh&gt; uname -a
NuttX 10.1.0 508215581f Sep  3 2021 10:47:34 sim sim
nsh&gt;
</code></pre><h2 id="running-lvgl" tabindex="-1">Running LVGL <a class="header-anchor" href="#running-lvgl" aria-label="Permalink to &quot;Running LVGL&quot;">​</a></h2><p>It is possible to run the LVGL Demo directly in the NuttX simulator :</p><pre><code> make distclean

 ./tools/configure.sh sim:lvgl_fb

 make -j

 ./nuttx
</code></pre><p>You should see a window with the touch calibration and then the LVGL demo:</p><p><img src="`+i+`" alt="LVGL Demo running in the NuttXs
simulator" class="align-center" width="100.0%"></p><h2 id="running-vnc-server" tabindex="-1">Running VNC Server <a class="header-anchor" href="#running-vnc-server" aria-label="Permalink to &quot;Running VNC Server&quot;">​</a></h2><p>NuttX supports a VNC server, so it means even boards without a LCD display could export a display interface over network. Also you can test it on NuttX simulator before getting it working on your board, just follow these steps :</p><pre><code> make distclean

 ./tools/configure.sh sim:vncserver

 make -j

 ./nuttx
</code></pre><p>Open a new terminal and execute :</p><pre><code> remmina -c vnc://localhost
</code></pre><p>You should see some squares in different colors displayed in remmina:</p><p><img src="`+r+`" alt="remmina connected to sims VNC Server">{.align-center width=&quot;100.0%&quot;}</p><h2 id="running-simulated-can" tabindex="-1">Running Simulated CAN <a class="header-anchor" href="#running-simulated-can" aria-label="Permalink to &quot;Running Simulated CAN&quot;">​</a></h2><p>The simulator supports CAN support via SocketCAN on the host. The CAN interface of the host must be properly configured:</p><pre><code>ip link set can0 type can bitrate 1000000
ip link set can0 up
</code></pre><p>Virtual CAN interface can be used as well:</p><pre><code>ip link add dev can0 type vcan
ifconfig can0 up
</code></pre><h2 id="supported-boards" tabindex="-1">Supported Boards <a class="header-anchor" href="#supported-boards" aria-label="Permalink to &quot;Supported Boards&quot;">​</a></h2><blockquote><p>boards/<em>/</em></p></blockquote>`,30)]))}const f=n(s,[["render",l]]);export{g as __pageData,f as default};
