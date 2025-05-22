import{_ as e,c as a,al as n,o as t}from"./chunks/framework.NFAqBSgQ.js";const h=JSON.parse('{"title":"Logging to a RAM Buffer","description":"","frontmatter":{},"headers":[],"relativePath":"en/guides/logging_rambuffer.md","filePath":"en/guides/logging_rambuffer.md"}'),p={name:"en/guides/logging_rambuffer.md"};function o(i,s,l,c,r,u){return t(),a("div",null,s[0]||(s[0]=[n(`<h1 id="logging-to-a-ram-buffer" tabindex="-1">Logging to a RAM Buffer <a class="header-anchor" href="#logging-to-a-ram-buffer" aria-label="Permalink to &quot;Logging to a RAM Buffer&quot;">​</a></h1><p>Warning</p><p>Migrated from: <a href="https://cwiki.apache.org/confluence/display/NUTTX/Logging+to+a+RAM+Buffer" target="_blank" rel="noreferrer">https://cwiki.apache.org/confluence/display/NUTTX/Logging+to+a+RAM+Buffer</a></p><h2 id="default-debug-output" tabindex="-1">Default Debug Output <a class="header-anchor" href="#default-debug-output" aria-label="Permalink to &quot;Default Debug Output&quot;">​</a></h2><p>By default, when you enable debug output, that output goes to the system console and is mixed up with the normal console output. Normally, that is sufficient. However there are some cases where you might want to do things differently. For example, if there is time critical debug output that interferes with the operation of the device. Or, if you would like to separate the normal console output from the debug output.</p><p>One particularly troublesome case is network debug output to console in a Telnet session. Since the telnet session remaps the console output to the Telnet connection, the network debug output can generate infinite loops because the network operation generates debug output to the console, which generates more debug output, ... and on and on.</p><p>With some creative configuration of the NuttX SYStem LOGging (SYSLOG) feature, these problems can all be eliminated.</p><h2 id="the-syslog-device" tabindex="-1">The syslog Device <a class="header-anchor" href="#the-syslog-device" aria-label="Permalink to &quot;The syslog Device&quot;">​</a></h2><p>Debug output goes to the [syslog]{.title-ref} device. As mentioned above, the default syslog device device is the system console. However there are many options to control the behavior of the syslog -- too many in fact. There are so many options that you will probably have to perform experiments to get the syslog working as you would like it too.</p><h2 id="the-ramlog-device" tabindex="-1">The RAMLOG Device <a class="header-anchor" href="#the-ramlog-device" aria-label="Permalink to &quot;The RAMLOG Device&quot;">​</a></h2><p>The RAMLOG device is a special character device that can really be used for most any purpose. However, the RAMLOG device has some special attributes that make it ideal for use as a syslogging device.</p><ul><li>It supports the <code>syslog_write</code> interface needed for system logging</li><li>It behaves much like a pipe: It implements a queue. Writing to the RAMLOG device adds data to the head of the queue; reading from the RAMLOG device removes data from the tail of the queue.</li><li>It can be configured to return EOF when you try to read and there is nothing available in the RAMLOG.</li></ul><h2 id="using-the-ramlog-as-the-syslog-device" tabindex="-1">Using the RAMLOG as the syslog Device <a class="header-anchor" href="#using-the-ramlog-as-the-syslog-device" aria-label="Permalink to &quot;Using the RAMLOG as the syslog Device&quot;">​</a></h2><p>This Wiki page addresses the setup for one configuration: Using a [RAMLOG]{.title-ref} as the syslog device. A RAMLOG is a circular buffer in memory. In this configuration, all debugout output goes to this circular buffer and can later be retrieved using the NSH <code>dmesg</code> command</p><p>Here is the summary of what I had to do to get the RAMLOG working as the syslog device. I use a simulation configuration, but for this feature this does not matter.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>tools/configure.sh sim:nsh</span></span>
<span class="line"><span>make menuconfig</span></span></code></pre></div><p>I added the following settings. First, these just give me some debug output to test against:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CONFIG_DEBUG=y</span></span>
<span class="line"><span>CONFIG_DEBUG_FS=y</span></span>
<span class="line"><span>CONFIG_DEBUG_SCHED=y</span></span></code></pre></div><p>This configures the virtual file system to support the syslog device and is a necessary pre-condition for other settings:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CONFIG_SYSLOG=y</span></span></code></pre></div><p>These enables the RAMLOG and configure it for use as the syslog device</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CONFIG_RAMLOG=y</span></span>
<span class="line"><span>CONFIG_RAMLOG_CONSOLE_BUFSIZE=8192</span></span>
<span class="line"><span>CONFIG_RAMLOG_NONBLOCKING=y</span></span>
<span class="line"><span>CONFIG_RAMLOG_SYSLOG=y</span></span>
<span class="line"><span>#CONFIG_SYSLOG_CHAR undefined, else duplicate output with syslog_write()</span></span></code></pre></div><p>Now when I run NuttX, I get output like this. The <code>dmesg</code> command now appears as an NSH command:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>NuttShell (NSH) NuttX-7.1</span></span>
<span class="line"><span>nsh&gt; help</span></span>
<span class="line"><span>help usage:  help [-v] [&lt;cmd&gt;]</span></span>
<span class="line"><span>[           dd          free        mkdir       mw          sleep      </span></span>
<span class="line"><span>?           df          help        mkfatfs     ps          test       </span></span>
<span class="line"><span>break       dmesg       hexdump     mkfifo      pwd         true       </span></span>
<span class="line"><span>cat         echo        kill        mkrd        rm          umount     </span></span>
<span class="line"><span>cd          exec        losetup     mh          rmdir       unset      </span></span>
<span class="line"><span>cp          exit        ls          mount       set         usleep     </span></span>
<span class="line"><span>cmp         false       mb          mv          sh          xd     </span></span>
<span class="line"><span>Builtin Apps:</span></span>
<span class="line"><span>hello</span></span></code></pre></div><p>The <code>dmesg</code> command dumps the contents and clears the RAMLOG:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>nsh&gt; dmesg</span></span>
<span class="line"><span>nx_start: Entry</span></span>
<span class="line"><span>up_unblock_task: Unblocking TCB=52bc70</span></span>
<span class="line"><span>up_unblock_task: New Active Task TCB=52bc70</span></span>
<span class="line"><span>posix_spawn_exec: ERROR: exec failed: 22</span></span>
<span class="line"><span>cmd_mkrd: RAMDISK at 52d4f0</span></span>
<span class="line"><span>posix_spawn_exec: ERROR: exec failed: 22</span></span>
<span class="line"><span>mkfatfs_tryfat16: Too few or too many clusters for FAT16: 4081 &lt; 983 &lt; 1022</span></span>
<span class="line"><span>mkfatfs_clustersearch: Cannot format FAT16 at 1 sectors/cluster</span></span>
<span class="line"><span>mkfatfs_configfatfs: Sector size:          512 bytes</span></span>
<span class="line"><span>mkfatfs_configfatfs: Number of sectors:    1024 sectors</span></span>
<span class="line"><span>mkfatfs_configfatfs: FAT size:             12 bits</span></span>
<span class="line"><span>mkfatfs_configfatfs: Number FATs:          2</span></span>
<span class="line"><span>mkfatfs_configfatfs: Sectors per cluster:  1 sectors</span></span>
<span class="line"><span>mkfatfs_configfatfs: FS size:              3 sectors</span></span>
<span class="line"><span>mkfatfs_configfatfs:                       985 clusters</span></span>
<span class="line"><span>mkfatfs_configfatfs: Root directory slots: 512</span></span>
<span class="line"><span>mkfatfs_configfatfs: Volume ID:            00000000</span></span>
<span class="line"><span>mkfatfs_configfatfs: Volume Label:         &quot;           &quot;</span></span>
<span class="line"><span>posix_spawn_exec: ERROR: exec failed: 22</span></span>
<span class="line"><span>fat_mount: FAT12:</span></span>
<span class="line"><span>fat_mount:      HW  sector size:     512</span></span>
<span class="line"><span>fat_mount:          sectors:         1024</span></span>
<span class="line"><span>fat_mount:      FAT reserved:        1</span></span>
<span class="line"><span>fat_mount:          sectors:         1024</span></span>
<span class="line"><span>fat_mount:          start sector:    1</span></span>
<span class="line"><span>fat_mount:          root sector:     7</span></span>
<span class="line"><span>fat_mount:          root entries:    512</span></span>
<span class="line"><span>fat_mount:          data sector:     39</span></span>
<span class="line"><span>fat_mount:          FSINFO sector:   0</span></span>
<span class="line"><span>fat_mount:          Num FATs:        2</span></span>
<span class="line"><span>fat_mount:          FAT sectors:     3</span></span>
<span class="line"><span>fat_mount:          sectors/cluster: 1</span></span>
<span class="line"><span>fat_mount:          max clusters:    985</span></span>
<span class="line"><span>fat_mount:      FSI free count       -1</span></span>
<span class="line"><span>fat_mount:          next free        0</span></span>
<span class="line"><span>posix_spawn_exec: ERROR: exec failed: 22</span></span>
<span class="line"><span>posix_spawn_exec: ERROR: exec failed: 22</span></span>
<span class="line"><span>nsh&gt;</span></span></code></pre></div><p>As mentioned, the dmesg command clears the RAMLOG. So when it is used again, only new debug output is shown:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>nsh&gt; dmesg</span></span>
<span class="line"><span>posix_spawn_exec: ERROR: exec failed: 22</span></span></code></pre></div><p>As a side note, the <code>posix_spawn_exec</code> error will occur on each command in this configuration. That is because NSH first tries to execute a command from a file found in the file system on the <code>PATH</code> variable. You will not see this error in your system unless you have <code>CONFIG_NSH_FILE_APPS=y</code> defined in your configuration.</p>`,29)]))}const g=e(p,[["render",o]]);export{h as __pageData,g as default};
