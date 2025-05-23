import{_ as r,c as t,al as n,o}from"./chunks/framework.NFAqBSgQ.js";const l=JSON.parse('{"title":"qemu-armv7a","description":"","frontmatter":{},"headers":[],"relativePath":"en/platforms/arm/qemu/boards/qemu-armv7a/index.md","filePath":"en/platforms/arm/qemu/boards/qemu-armv7a/index.md"}'),i={name:"en/platforms/arm/qemu/boards/qemu-armv7a/index.md"};function a(m,e,s,c,p,h){return o(),t("div",null,e[0]||(e[0]=[n(`<h1 id="qemu-armv7a" tabindex="-1">qemu-armv7a <a class="header-anchor" href="#qemu-armv7a" aria-label="Permalink to &quot;qemu-armv7a&quot;">​</a></h1><p>This board configuration will use QEMU to emulate generic ARM v7-A series hardware platform and provides support for these devices:</p><ul><li>GICv2 interrupt controllers</li><li>ARM Generic Timer</li><li>PL011 UART controller</li><li>PCI ECAM</li><li>VirtIO Device</li></ul><h2 id="getting-started" tabindex="-1">Getting Started <a class="header-anchor" href="#getting-started" aria-label="Permalink to &quot;Getting Started&quot;">​</a></h2><h3 id="nsh-single-core" tabindex="-1">NSH (Single Core) <a class="header-anchor" href="#nsh-single-core" aria-label="Permalink to &quot;NSH (Single Core)&quot;">​</a></h3><p>Configuring NuttX and compile:</p><pre><code> ./tools/configure.sh -l qemu-armv7a:nsh
 make
</code></pre><p>Running with qemu:</p><pre><code> qemu-system-arm -cpu cortex-a7 -nographic \\
-machine virt,virtualization=off,gic-version=2 \\
-net none -chardev stdio,id=con,mux=on -serial chardev:con \\
-mon chardev=con,mode=readline -kernel ./nuttx
</code></pre><h3 id="knsh-single-core" tabindex="-1">KNSH (Single Core) <a class="header-anchor" href="#knsh-single-core" aria-label="Permalink to &quot;KNSH (Single Core)&quot;">​</a></h3><p>This is a configuration of testing the BUILD_KERNEL configuration:</p><pre><code> cd nuttx
 ./tools/configure.sh qemu-armv7a:knsh
 make V=1 -j7
 make export V=1
 cd ../apps
 ./tools/mkimport.sh -z -x ../nuttx/nuttx-export-*.tar.gz
 make import V=1
 cd ../nuttx
 qemu-system-arm -semihosting -M virt -m 1024 -nographic -kernel ./nuttx

NuttShell (NSH) NuttX-12.3.0-RC0
nsh&gt; uname -a
NuttX 12.3.0-RC0 28dee592a3-dirty Oct 12 2023 03:03:07 arm qemu-armv7a
nsh&gt; ps
  PID GROUP PRI POLICY   TYPE    NPX STATE    EVENT     SIGMASK           STACK   USED  FILLED COMMAND
    0     0   0 FIFO     Kthread N-- Ready              0000000000000000 004088 000896  21.9%  Idle_Task
    1     1 100 RR       Kthread --- Waiting  Semaphore 0000000000000000 004040 000304   7.5%  lpwork 0x40119398 0x401193ac
    2     2 100 RR       Task    --- Running            0000000000000000 003032 001032  34.0%  /system/bin/init
nsh&gt; free
                   total       used       free    largest  nused  nfree
        Kmem:  133058556      16644  133041912  133041152     41      3
        Page:  134217728    1105920  133111808  133111808
nsh&gt; /system/bin/hello
Hello, World!!
nsh&gt;
</code></pre><h3 id="inter-vm-share-memory-device-ivshmem" tabindex="-1">Inter-VM share memory Device (ivshmem) <a class="header-anchor" href="#inter-vm-share-memory-device-ivshmem" aria-label="Permalink to &quot;Inter-VM share memory Device (ivshmem)&quot;">​</a></h3><p>Inter-VM shared memory support support can be found in <code>drivers/pci/pci_ivshmem.c</code>.</p><p>This implementation is for <code>ivshmem-v1</code> which is compatible with QEMU and ACRN hypervisor but won&#39;t work with Jailhouse hypervisor which uses <code>ivshmem-v2</code>.</p><p>Please refer to the official <a href="https://www.qemu.org/docs/master/system/devices/ivshmem.html" target="_blank" rel="noreferrer">Qemu ivshmem documentation</a> for more information.</p><p>This is an example implementation for OpenAMP based on the Inter-VM share memory(ivshmem):</p><pre><code>rpproxy_ivshmem:  Remote slave(client) proxy process.
rpserver_ivshmem: Remote master(host) server process.
</code></pre><p>Steps for Using NuttX as IVSHMEM host and guest</p><ol><li>Build images</li></ol><blockquote><p>a. Build rpserver_ivshmem:</p><pre><code>     cmake -B server -DBOARD_CONFIG=qemu-armv7a:rpserver_ivshmem -GNinja
     cmake --build server
</code></pre><p>b. Build rpproxy_ivshmem:</p><pre><code>     cmake -B proxy -DBOARD_CONFIG=qemu-armv7a:rpproxy_ivshmem -GNinja
     cmake --build proxy
</code></pre></blockquote><ol start="2"><li>Bringup firmware via Qemu:</li></ol><blockquote><p>The Inter-VM Shared Memory device basic syntax is:</p><pre><code>-device ivshmem-plain,id=shmem0,memdev=shmmem-shmem0,addr=0xb \\
-object memory-backend-file,id=shmmem-shmem0,mem-path=/dev/shm/ivshmem0,size=4194304,share=yes
</code></pre><p>a. Start rpserver_ivshmem:</p><pre><code>     qemu-system-arm -cpu cortex-a7 -nographic -machine virt,highmem=off \\
      -object memory-backend-file,id=shmmem-shmem0,mem-path=/dev/shm/ivshmem0,size=4194304,share=yes \\
      -device ivshmem-plain,id=shmem0,memdev=shmmem-shmem0,addr=0xb \\
      -kernel server/nuttx -nographic
</code></pre><p>b. Start rpproxy_ivshmem:</p><pre><code>     qemu-system-arm -cpu cortex-a7 -nographic -machine virt,highmem=off \\
      -object memory-backend-file,discard-data=on,id=shmmem-shmem0,mem-path=/dev/shm/ivshmem0,size=4194304,share=yes \\
      -device ivshmem-plain,id=shmem0,memdev=shmmem-shmem0,addr=0xb \\
      -kernel proxy/nuttx -nographic
</code></pre><p>c. Check the RPMSG Syslog in rpserver shell:</p><blockquote><p>In the current configuration, the proxy syslog will be sent to the server by default. You can check whether there is proxy startup log in the server shell.</p><p>RpServer bring up:</p><pre><code> qemu-system-arm -cpu cortex-a7 -nographic -machine virt,highmem=off \\
  -object memory-backend-file,id=shmmem-shmem0,mem-path=/dev/shm/ivshmem0,size=4194304,share=yes \\
  -device ivshmem-plain,id=shmem0,memdev=shmmem-shmem0,addr=0xb \\
  -kernel server/nuttx -nographic
[    0.000000] [ 0] [  INFO] [server] pci_register_rptun_ivshmem_driver: Register ivshmem driver, id=0, cpuname=proxy, master=0
...
[    0.306127] [ 3] [  INFO] [server] rptun_ivshmem_probe: Start the wdog
</code></pre><p>After rpproxy bring up, check the log from rpserver:</p><pre><code>NuttShell (NSH) NuttX-10.4.0
server&gt;
[    0.000000] [ 0] [  INFO] [proxy] pci_register_rptun_ivshmem_driver: Register ivshmem driver, id=0, cpuname=server, master=1
...
[    0.314039] [ 3] [  INFO] [proxy] ivshmem_probe: shmem addr=0x10400000 size=4194304 reg=0x10008000
</code></pre></blockquote><p>d. IPC test via RPMSG socket:</p><blockquote><p>Start rpmsg socket server:</p><pre><code>server&gt; rpsock_server stream block test
server: create socket SOCK_STREAM nonblock 0
server: bind cpu , name test ...
server: listen ...
server: try accept ...
server: Connection accepted -- 4
server: try accept ...
</code></pre><p>Switch to proxy shell and start rpmsg socket client, test start:</p><pre><code>proxy&gt; rpsock_client stream block test server
client: create socket SOCK_STREAM nonblock 0
client: Connecting to server,test...
client: Connected
client send data, cnt 0, total len 64, BUFHEAD process0007, msg0000, name:test
client recv data process0007, msg0000, name:test
...
client recv done, total 4096000, endflags, send total 4096000
client: Terminating
</code></pre><p>Check the log on rpserver shell:</p><pre><code>server recv data normal exit
server Complete ret 0, errno 0
</code></pre></blockquote></blockquote><h2 id="debugging-with-qemu" tabindex="-1">Debugging with QEMU <a class="header-anchor" href="#debugging-with-qemu" aria-label="Permalink to &quot;Debugging with QEMU&quot;">​</a></h2><p>The nuttx ELF image can be debugged with QEMU.</p><ol><li><p>To debug the nuttx (ELF) with symbols, make sure the following change have applied to defconfig:</p><pre><code>+CONFIG_DEBUG_SYMBOLS=y
</code></pre></li><li><p>Run QEMU (Single Core) at shell terminal 1:</p><pre><code> qemu-system-arm -cpu cortex-a7 -nographic \\
-machine virt,virtualization=off,gic-version=2 \\
-net none -chardev stdio,id=con,mux=on -serial chardev:con \\
-mon chardev=con,mode=readline -kernel ./nuttx -S -s
</code></pre></li><li><p>Run gdb with TUI, connect to QEMU, load nuttx and continue (at shell terminal 2):</p><pre><code> arm-none-eabi-gdb -tui --eval-command=&#39;target remote localhost:1234&#39; nuttx
(gdb) c
Continuing.
^C
Program received signal SIGINT, Interrupt.
nx_start () at armv7-a/arm_head.S:209
(gdb)
</code></pre></li></ol><h2 id="pci-support" tabindex="-1">PCI support <a class="header-anchor" href="#pci-support" aria-label="Permalink to &quot;PCI support&quot;">​</a></h2><p>To enable PCI support, set the following options:</p><pre><code>CONFIG_DEVICE_TREE=y
CONFIG_PCI=y
CONFIG_PCI=y
</code></pre><p>Then run qemu with:</p><pre><code>-machine virt,highmem=off,virtualization=off,gic-version=2
</code></pre><p>The command that starts QEMU and enables the QEMU EDU device looks like this:</p><pre><code>qemu-system-arm -cpu cortex-a7 -nographic \\
-machine virt,highmem=off,virtualization=off,gic-version=2 \\
-chardev stdio,id=con,mux=on -serial chardev:con -mon chardev=con,mode=readline \\
-kernel nuttx -device edu
</code></pre>`,33)]))}const u=r(i,[["render",a]]);export{l as __pageData,u as default};
