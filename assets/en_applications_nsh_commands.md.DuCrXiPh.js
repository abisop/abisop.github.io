import{_ as a,c as r,al as o,j as e,a as t,o as s}from"./chunks/framework.NFAqBSgQ.js";const g=JSON.parse('{"title":"Commands","description":"","frontmatter":{},"headers":[],"relativePath":"en/applications/nsh/commands.md","filePath":"en/applications/nsh/commands.md"}'),d={name:"en/applications/nsh/commands.md"};function i(c,n,l,p,h,m){return s(),r("div",null,n[0]||(n[0]=[o(`<h1 id="commands" tabindex="-1">Commands <a class="header-anchor" href="#commands" aria-label="Permalink to &quot;Commands&quot;">​</a></h1><h2 id="test-evaluate-expression" tabindex="-1"><code>test</code> Evaluate Expression <a class="header-anchor" href="#test-evaluate-expression" aria-label="Permalink to &quot;\`test\` Evaluate Expression&quot;">​</a></h2><p><strong>Command Syntax:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[ &lt;expression&gt; ]</span></span>
<span class="line"><span>test &lt;expression&gt;</span></span></code></pre></div><p><strong>Synopsis</strong>. These are two alternative forms of the same command. They support evaluation of a boolean expression which sets <code>?</code>. This command is used most frequently as the conditional command following the <code>if</code> in the <code>if-then[-else]-fi</code>.</p><p><strong>Expression Syntax:</strong></p><pre><code>expression = simple-expression | !expression | expression -o expression | expression -a expression

simple-expression = unary-expression | binary-expression

unary-expression = string-unary | file-unary

string-unary = -n string | -z string

file-unary = -b file | -c file | -d file | -e file | -f file | -r file | -s file | -w file

binary-expression = string-binary | numeric-binary

string-binary = string = string | string == string | string != string

numeric-binary = integer -eq integer | integer -ge integer | integer -gt integer | integer -le integer | integer -lt integer | integer -ne integer
</code></pre><h2 id="addroute-add-a-routing-table-entry" tabindex="-1"><code>addroute</code> Add a Routing Table Entry <a class="header-anchor" href="#addroute-add-a-routing-table-entry" aria-label="Permalink to &quot;\`addroute\` Add a Routing Table Entry&quot;">​</a></h2><p><strong>Command Syntax:</strong></p><pre><code>addroute &lt;target&gt; [&lt;netmask&gt;] &lt;router&gt;
addroute default &lt;ipaddr&gt; &lt;interface&gt;
</code></pre><p><strong>Synopsis</strong>. This command adds an entry in the routing table. The new entry will map the IP address of a router on a local network (&lt;router&gt;) to an external network characterized by the &lt;target&gt; IP address and a network mask &lt;netmask&gt;</p><p>The netmask may also be expressed using IPv4 CIDR or IPv6 slash notation. In that case, the netmask need not be provided.</p><p><strong>Example:</strong></p><pre><code>nsh&gt; addroute 11.0.0.0 255.255.255.0 10.0.0.2
</code></pre><p>which is equivalent to</p><pre><code>nsh&gt; addroute 11.0.0.0/24 10.0.0.2
</code></pre><p>The second form of the addroute command can be used to set the default gateway.</p><h2 id="arp-access-the-arp-table" tabindex="-1"><code>arp</code> Access the ARP table <a class="header-anchor" href="#arp-access-the-arp-table" aria-label="Permalink to &quot;\`arp\` Access the ARP table&quot;">​</a></h2><p><strong>Command syntax</strong>:</p><pre><code>arp [-t|-a &lt;ipaddr&gt; |-d &lt;ipaddr&gt; |-s &lt;ipaddr&gt; &lt;hwaddr&gt;]
</code></pre><p><strong>Synopsis</strong>: Access the OS ARP table.</p><blockquote><p>-a &lt;ipaddr&gt; Will show the hardware address that the IP address &lt;ipaddr&gt; is</p><p>: mapped to.</p><p>-d &lt;ipaddr&gt; Will delete the mapping for the IP address &lt;ipaddr&gt; from the</p><p>: ARP table.</p><p>-s &lt;ipaddr hwaddr&gt; Will set (or replace) the mapping of the IP address &lt;ipaddr&gt; to</p><p>: the hardware address &lt;hwaddr&gt;.</p><p>-t Will dump the entire content of the ARP table. This option is</p><p>: only available if <code>CONFIG_NETLINK_ROUTE</code> is enabled.</p></blockquote><p><strong>Example</strong>:</p><pre><code>nsh&gt; arp -a 10.0.0.1
nsh: arp: no such ARP entry: 10.0.0.1

nsh&gt; arp -s 10.0.0.1 00:13:3b:12:73:e6
nsh&gt; arp -a 10.0.0.1
HWAddr: 00:13:3b:12:73:e6

nsh&gt; arp -d 10.0.0.1
nsh&gt; arp -a 10.0.0.1
nsh: arp: no such ARP entry: 10.0.0.1
</code></pre><h2 id="base64dec-base64-decode" tabindex="-1"><code>base64dec</code> Base64 Decode <a class="header-anchor" href="#base64dec-base64-decode" aria-label="Permalink to &quot;\`base64dec\` Base64 Decode&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>base64dec [-w] [-f] &lt;string or filepath&gt;
</code></pre><p><strong>Synopsis</strong>. <em>To be provided.</em></p><h2 id="base64enc-base64-encode" tabindex="-1"><code>base64enc</code> Base64 Encode <a class="header-anchor" href="#base64enc-base64-encode" aria-label="Permalink to &quot;\`base64enc\` Base64 Encode&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>base64enc [-w] [-f] &lt;string or filepath&gt;
</code></pre><p><strong>Synopsis</strong>. <em>To be provided.</em></p><h2 id="basename-extract-base-file-directory-name" tabindex="-1"><code>basename</code> Extract Base File/Directory Name <a class="header-anchor" href="#basename-extract-base-file-directory-name" aria-label="Permalink to &quot;\`basename\` Extract Base File/Directory Name&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>basename &lt;path&gt; [&lt;suffix&gt;]
</code></pre><p><strong>Synopsis</strong>. Extract the final string from a <code>&lt;path&gt;</code> by removing the preceding path segments and (optionally) removing any trailing <code>&lt;suffix&gt;</code>.</p><h2 id="break-terminate-a-loop" tabindex="-1"><code>break</code> Terminate a Loop <a class="header-anchor" href="#break-terminate-a-loop" aria-label="Permalink to &quot;\`break\` Terminate a Loop&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>break
</code></pre><p><strong>Synopsis</strong>. The <code>break</code> command is only meaningful within the body of the a <code>while</code> or <code>until</code> loop, between the <code>do</code> and <code>done</code> tokens. Outside of a loop, <code>break</code> command does nothing. If the <code>break</code> command is executed within the body of a loop, the loop will immediately terminate and execution will continue with the next command immediately following the <code>done</code> token.</p><h2 id="cat-concatenate-files" tabindex="-1"><code>cat</code> Concatenate Files <a class="header-anchor" href="#cat-concatenate-files" aria-label="Permalink to &quot;\`cat\` Concatenate Files&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>cat &lt;path&gt; [&lt;path&gt; [&lt;path&gt; ...]]
</code></pre><p><strong>Synopsis</strong>. This command copies and concatenates all of the files at <code>&lt;path&gt;</code> to the console (or to another file if the output is redirected).</p><h2 id="cd-change-current-working-directory" tabindex="-1"><code>cd</code> Change Current Working Directory <a class="header-anchor" href="#cd-change-current-working-directory" aria-label="Permalink to &quot;\`cd\` Change Current Working Directory&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>cd [&lt;dir-path&gt;|-|~|..]
</code></pre><p><strong>Synopsis</strong>. Changes the current working directory (<code>PWD</code>). Also sets the previous working directory environment variable (<code>OLDPWD</code>).</p><p><strong>Forms:</strong></p><hr><p><code>cd &lt;dir-path&gt;</code> sets the current working directory to &lt;dir-path&gt;. <code>cd -</code> sets the current working directory to the previous working directory (\\OLDPWD). Equivalent to cd \\OLDPWD. <code>cd</code> or <code>cd ~</code> set the current working directory to the &#39;home&#39; directory. The home directory can be configured by setting CONFIG_LIBC_HOMEDIR in the configuration file. The default home directory is /. <code>cd ..</code> sets the current working directory to the parent directory.</p><hr><h2 id="cmp-compare-files" tabindex="-1"><code>cmp</code> Compare Files <a class="header-anchor" href="#cmp-compare-files" aria-label="Permalink to &quot;\`cmp\` Compare Files&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>cmp &lt;path1&gt; &lt;path2&gt;
</code></pre><p><strong>Synopsis</strong>. Compare of the contents of the file at <code>&lt;path1&gt;</code> with the contents of the file at <code>&lt;path2&gt;</code>. Returns an indication only if the files differ.</p><h2 id="cp-copy-files" tabindex="-1"><code>cp</code> Copy Files <a class="header-anchor" href="#cp-copy-files" aria-label="Permalink to &quot;\`cp\` Copy Files&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>cp &lt;source-path&gt; &lt;dest-path&gt;
</code></pre><p><strong>Synopsis</strong>. Copy of the contents of the file at <code>&lt;source-path&gt;</code> to the location in the file system indicated by <code>&lt;dest-path&gt;</code>.</p><h2 id="date-show-or-set-the-date-and-time" tabindex="-1"><code>date</code> Show or set the date and time <a class="header-anchor" href="#date-show-or-set-the-date-and-time" aria-label="Permalink to &quot;\`date\` Show or set the date and time&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>date [-s &quot;MMM DD HH:MM:SS YYYY&quot;] [-u] [+%format]
</code></pre><p><strong>Synopsis</strong>. Show or set the current date and time or UTC with <code>-u</code> option, and support format output with <code>+%format</code>.</p><p>To show the current system time and date, type in the <code>date</code> command. The output displays the day of the week, day of the month, month, year, current time. 24-hour time is used. Only one format is used, both on display and when setting the date/time. To change the system clock manually, type <code>date -s MMM DD HH:MM:SS YYYY</code>.</p><blockquote><ul><li><code>MMM</code> Short month name (e.g., Sep).</li><li>Space separator.</li><li><code>DD</code> Day of month (e.g., 01).</li><li>Space separator.</li><li><code>HH</code> Hour (00-23).</li><li><code>:</code> Colon separator.</li><li><code>MM</code> Minute (00-59).</li><li><code>:</code> Colon separator.</li><li><code>SS</code> Second (00-60).</li><li>Space separator</li><li><code>YYYY</code> Year (e.g., 2023).</li></ul></blockquote><p><strong>Example</strong>:</p><pre><code>nsh&gt; date
Thu, Jan 01 00:00:17 1970
nsh&gt; date -s &quot;Sep 15 11:30:00 2023&quot;
nsh&gt; date
Fri, Sep 15 11:30:03 2023
</code></pre><h2 id="dd-copy-and-convert-files" tabindex="-1"><code>dd</code> Copy and Convert Files <a class="header-anchor" href="#dd-copy-and-convert-files" aria-label="Permalink to &quot;\`dd\` Copy and Convert Files&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>dd if=&lt;infile&gt; of=&lt;outfile&gt; [bs=&lt;sectsize&gt;] [count=&lt;sectors&gt;] [skip=&lt;sectors&gt;]
</code></pre><p><strong>Synopsis</strong>. Copy blocks from &lt;infile&gt; to &lt;outfile&gt;. &lt;infile&gt; or &lt;outfile&gt; may be the path to a standard file, a character device, or a block device. Examples follow:</p><p>Read from character device, write to regular file. This will create a new file of the specified size filled with zero:</p><pre><code>nsh&gt; ls -l /dev
/dev:
 crw-rw-rw-       0 zero
nsh&gt; dd if=/dev/zero of=/tmp/zeros bs=64 count=16
nsh&gt; ls -l /tmp
/tmp:
 -rw-rw-rw-    1024 ZEROS
</code></pre><p>Read from character device, write to block device. This will fill the entire block device with zeros:</p><pre><code>nsh&gt; ls -l /dev
/dev:
 brw-rw-rw-       0 ram0
 crw-rw-rw-       0 zero
nsh&gt; dd if=/dev/zero of=/dev/ram0
</code></pre><p>Read from a block device, write to a character device. This will read the entire block device and dump the contents in the bit bucket:</p><pre><code>nsh&gt; ls -l /dev
/dev:
 crw-rw-rw-       0 null
 brw-rw-rw-       0 ram0
nsh&gt; dd if=/dev/ram0 of=/dev/null
</code></pre><h2 id="delroute-delete-a-routing-table-entry" tabindex="-1"><code>delroute</code> Delete a Routing Table Entry <a class="header-anchor" href="#delroute-delete-a-routing-table-entry" aria-label="Permalink to &quot;\`delroute\` Delete a Routing Table Entry&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>delroute &lt;target&gt; [&lt;netmask&gt;]
</code></pre><p><strong>Synopsis</strong>. The entry removed will be the first entry in the routing table that matches the external network characterized by the &lt;target&gt; IP address and the network mask &lt;netmask&gt;</p><p>The netmask may also be expressed using IPv4 CIDR or IPv6 slash notation. In that case, the netmask need not be provided.</p><p><strong>Example</strong>:</p><pre><code>nsh&gt; delroute 11.0.0.0 255.255.255.0
</code></pre><p>which is equivalent to:</p><pre><code>nsh&gt; delroute 11.0.0.0/24
</code></pre><h2 id="df-show-volume-status" tabindex="-1"><code>df</code> Show Volume Status <a class="header-anchor" href="#df-show-volume-status" aria-label="Permalink to &quot;\`df\` Show Volume Status&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>df [-h]
</code></pre><p><strong>Synopsis</strong>. Show the state of each mounted volume. As an example:</p><pre><code>nsh&gt; mount
  /etc type romfs
  /tmp type vfat
nsh&gt; df
  Block  Number
  Size   Blocks     Used Available Mounted on
    64        6        6         0 /etc
   512      985        2       983 /tmp
nsh&gt;
</code></pre><p>If <code>CONFIG_NSH_CMDOPT_DF_H</code> is defined in the NuttX configuration, then the <code>df</code> will also support an option <code>-h</code> which may be used to show the volume information in <em>human readable</em> format.</p><h2 id="dirname-extract-path-to-a-file-directory" tabindex="-1"><code>dirname</code> Extract Path to a File/Directory <a class="header-anchor" href="#dirname-extract-path-to-a-file-directory" aria-label="Permalink to &quot;\`dirname\` Extract Path to a File/Directory&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>dirname &lt;path&gt;
</code></pre><p><strong>Synopsis</strong>. Extract the path string leading up to the full <code>&lt;path&gt;</code> by removing the final directory or file name.</p><h2 id="dmesg-dump-buffered-syslog-output" tabindex="-1"><code>dmesg</code> Dump Buffered SYSLOG Output <a class="header-anchor" href="#dmesg-dump-buffered-syslog-output" aria-label="Permalink to &quot;\`dmesg\` Dump Buffered SYSLOG Output&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>dmesg
</code></pre><p><strong>Synopsis</strong>. This command can be used to dump (and clear) the content of any buffered syslog output messages. This command is only available if <code>CONFIG_RAMLOG_SYSLOG</code> is enabled. In that case, syslog output will be collected in an in-memory, circular buffer. Entering the <code>dmesg</code> command will dump the content of that in-memory, circular buffer to the NSH console output. <code>dmesg</code> has the side effect of clearing the buffered data so that entering <code>dmesg</code> again will show only newly buffered data.</p><h2 id="echo-echo-strings-and-variables" tabindex="-1"><code>echo</code> Echo Strings and Variables <a class="header-anchor" href="#echo-echo-strings-and-variables" aria-label="Permalink to &quot;\`echo\` Echo Strings and Variables&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>echo [-n] [&lt;string|name&gt; [&lt;string|name&gt;...]]
</code></pre><p><strong>Synopsis</strong>. Copy the sequence of strings and expanded environment variables to console output (or to a file if the output is re-directed).</p><p>The <code>-n</code> option suppresses the trailing newline character.</p><h2 id="env-show-environment-variables" tabindex="-1"><code>env</code> Show Environment Variables <a class="header-anchor" href="#env-show-environment-variables" aria-label="Permalink to &quot;\`env\` Show Environment Variables&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>env
</code></pre><p><strong>Synopsis</strong>. Show the current name-value pairs in the environment. Example:</p><pre><code>nsh&gt; env
PATH=/bin

nsh&gt; set foo bar
nsh&gt; env
PATH=/bin
foo=bar

nsh&gt; unset PATH
nsh&gt; env
foo=bar

nsh&gt;
</code></pre><p>Note</p><p>NSH local variables are <em>not</em> shown by the <code>env</code> command.</p><h2 id="exec-execute-user-code" tabindex="-1"><code>exec</code> Execute User Code <a class="header-anchor" href="#exec-execute-user-code" aria-label="Permalink to &quot;\`exec\` Execute User Code&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>exec &lt;hex-address&gt;
</code></pre><p><strong>Synopsis</strong>. Execute the user logic at address <code>&lt;hex-address&gt;</code>. NSH will pause until the execution unless the user logic is executed in background via <code>exec &lt;hex-address&gt; &amp;</code>.</p><h2 id="exit-exit-nsh" tabindex="-1"><code>exit</code> Exit NSH <a class="header-anchor" href="#exit-exit-nsh" aria-label="Permalink to &quot;\`exit\` Exit NSH&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>exit
</code></pre><p><strong>Synopsis</strong>. Exit NSH. Only useful for the serial front end if you have started some other tasks (perhaps using the <code>exec</code> command) and you would like to have NSH out of the way. For the telnet front-end, <code>exit</code> terminates the telnet session.</p><h2 id="export-set-an-environment-variable" tabindex="-1"><code>export</code> Set an Environment Variable <a class="header-anchor" href="#export-set-an-environment-variable" aria-label="Permalink to &quot;\`export\` Set an Environment Variable&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>export &lt;name&gt; [&lt;value&gt;]
</code></pre><p><strong>Synopsis</strong>. The <code>export</code> command sets an environment variable, or promotes an NSH variable to an environment variable. As examples:</p><blockquote><ol><li><p>Using <code>export</code> to promote an NSH variable to an environment variable:</p><pre><code>nsh&gt; env
PATH=/bin

nsh&gt; set foo bar
nsh&gt; env
PATH=/bin

nsh&gt; export foo
nsh&gt; env
PATH=/bin
foo=bar
</code></pre><p>A group-wide environment variable is created with the same value as the local NSH variable; the local NSH variable is removed.</p><blockquote><p>Note</p><p>This behavior differs from the Bash shell. Bash would retain the local Bash variable which will shadow the environment variable of the same name and same value.</p></blockquote></li><li><p>Using <code>export</code> to set an environment variable:</p><pre><code>nsh&gt; export dog poop
nsh&gt; env
PATH=/bin
foo=bar
dog=poop
</code></pre></li></ol></blockquote><p>The <code>export</code> command is not supported by NSH unless both <code>CONFIG_NSH_VARS=y</code> and <code>CONFIG_DISABLE_ENVIRON</code>is not set.</p><h2 id="expr-evaluate-expressions" tabindex="-1"><code>expr</code> Evaluate expressions <a class="header-anchor" href="#expr-evaluate-expressions" aria-label="Permalink to &quot;\`expr\` Evaluate expressions&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>expr &lt;operand1&gt; &lt;operator&gt; &lt;operand2&gt;
</code></pre><p><strong>Synopsis</strong>. It is a mini version for the expr command, which implements the features of addition, subtraction, multiplication, division and mod.</p><p><strong>Examples</strong>:</p><blockquote><p>nsh&gt; expr 5 - 2 3 nsh&gt; set hello 10 nsh&gt; expr \\hello - 2 8 nsh&gt; expr 8 a 9 Unknown operator nsh&gt; expr 20 / 5 4 nsh&gt; expr 10 % 4 2 nsh&gt; expr 100 + 0 100</p></blockquote><h2 id="free-show-memory-manager-status" tabindex="-1"><code>free</code> Show Memory Manager Status <a class="header-anchor" href="#free-show-memory-manager-status" aria-label="Permalink to &quot;\`free\` Show Memory Manager Status&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>free
</code></pre><p><strong>Synopsis</strong>. Show the current state of the memory allocator. For example:</p><pre><code>nsh&gt; free
             total       used       free    largest  nused  nfree
Mem:       5583024    1614784    3968240    3967792    244      4

nsh&gt;
</code></pre><p><strong>Where:</strong></p><hr><p>total This is the total size of memory allocated for use by malloc in bytes. used This is the total size of memory occupied by chunks handed out by malloc. free This is the total size of memory occupied by free (not in use) chunks. largest Size of the largest free (not in use) chunk. nused This is the number of allocated chunks nfree This is the number of free chunks</p><hr><h2 id="get-get-file-via-tftp" tabindex="-1"><code>get</code> Get File Via TFTP <a class="header-anchor" href="#get-get-file-via-tftp" aria-label="Permalink to &quot;\`get\` Get File Via TFTP&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>get [-b|-n] [-f &lt;local-path&gt;] -h &lt;ip-address&gt; &lt;remote-path&gt;
</code></pre><p><strong>Synopsis</strong>. Copy the file at <code>&lt;remote-address&gt;</code> from the host whose IP address is identified by <code>&lt;ip-address&gt;</code>.</p><p><strong>Other options</strong></p><hr><p><code>-f &lt;local-path&gt;</code> The file will be saved relative to the current working directory unless &lt;local-path&gt; is provided. <code>-n</code> Selects text (&quot;netascii&quot;) transfer mode (default). <code>-b</code> Selects binary (&quot;octet&quot;) transfer mode</p><hr><h2 id="help-show-usage-command-usage" tabindex="-1"><code>help</code> Show Usage Command Usage <a class="header-anchor" href="#help-show-usage-command-usage" aria-label="Permalink to &quot;\`help\` Show Usage Command Usage&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>help [-v] [&lt;cmd&gt;]
</code></pre><p><strong>Synopsis</strong>. Presents summary information about NSH commands to console.</p><p><strong>Options</strong></p><hr><p><code>-v</code> how verbose output will full command usage. <code>&lt;cmd&gt;</code> Show full command usage only for this command.</p><hr><h2 id="hexdump-hexadecimal-dump-of-file-or-device" tabindex="-1"><code>hexdump</code> Hexadecimal Dump of File or Device <a class="header-anchor" href="#hexdump-hexadecimal-dump-of-file-or-device" aria-label="Permalink to &quot;\`hexdump\` Hexadecimal Dump of File or Device&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>hexdump &lt;file or device&gt; [skip=&lt;bytes&gt;] [count=&lt;bytes&gt;]
</code></pre><p><strong>Synopsis</strong>. Dump data in hexadecimal format from a file or character device</p><hr><p><code>skip=&lt;bytes&gt;</code> Will skip &lt;bytes&gt; number of bytes from the beginning. <code>count=&lt;bytes&gt;</code> Will stop after dumping &lt;bytes&gt; number of bytes.</p><hr><p>The <code>skip</code> and <code>count</code> options are only available if <code>CONFIG_NSH_CMDOPT_HEXDUMP</code> is defined in the NuttX configuration.</p><h2 id="ifconfig-manage-network-configuration" tabindex="-1"><code>ifconfig</code> Manage Network Configuration <a class="header-anchor" href="#ifconfig-manage-network-configuration" aria-label="Permalink to &quot;\`ifconfig\` Manage Network Configuration&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>ifconfig [nic_name [&lt;ip-address&gt;|dhcp]] [dr|gw|gateway &lt;dr-address&gt;] [netmask &lt;net-mask&gt;] [dns &lt;dns-address&gt;] [hw &lt;hw-mac&gt;]]
</code></pre><p><strong>Synopsis</strong>. Multiple forms of the <code>ifconfig</code> command are supported:</p><blockquote><ol><li><p>With one or no arguments, <code>ifconfig</code> will shows the current configuration of the network and, perhaps, the status of Ethernet device:</p><pre><code>ifconfig
ifconfig [nic_name]
</code></pre><p>As an example:</p><pre><code>nsh&gt; ifconfig
eth0    HWaddr 00:18:11:80:10:06
        IPaddr:10.0.0.2 DRaddr:10.0.0.1 Mask:255.255.255.0
</code></pre><p>If network statistics are enabled (<code>CONFIG_NET_STATISTICS</code>), then this command will also show the detailed state of network.</p></li><li><p>If both the network interface name and an IP address are supplied as arguments, then <code>ifconfig</code> will set the address of the Ethernet device:</p><pre><code>ifconfig nic_name ip_address
</code></pre></li><li><p>Other forms <em>to be provided</em></p></li></ol></blockquote><p>Note</p><p>This commands depends upon having the <em>procfs</em> file system configured into the system. The <em>procfs</em> file system must also have been mounted with a command like:</p><p>nsh&gt; mount -t procfs /proc</p><h2 id="ifdown-take-a-network-down" tabindex="-1"><code>ifdown</code> Take a network down <a class="header-anchor" href="#ifdown-take-a-network-down" aria-label="Permalink to &quot;\`ifdown\` Take a network down&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>ifdown &lt;interface&gt;
</code></pre><p><strong>Synopsis</strong>. Take down the interface identified by the name &lt;interface&gt;.</p><p><strong>Example</strong>:</p><pre><code>ifdown eth0
</code></pre><h2 id="ifup-bring-a-network-up" tabindex="-1"><code>ifup</code> Bring a network up <a class="header-anchor" href="#ifup-bring-a-network-up" aria-label="Permalink to &quot;\`ifup\` Bring a network up&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>ifup &lt;interface&gt;
</code></pre><p><strong>Synopsis</strong>. Bring up down the interface identified by the name &lt;interface&gt;.</p><p><strong>Example</strong>:</p><pre><code>ifup eth0
</code></pre><h2 id="insmod-install-an-os-module" tabindex="-1"><code>insmod</code> Install an OS module <a class="header-anchor" href="#insmod-install-an-os-module" aria-label="Permalink to &quot;\`insmod\` Install an OS module&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>insmod &lt;file-path&gt; &lt;module-name&gt;
</code></pre><p><strong>Synopsis</strong>. Install the loadable OS module at &lt;file-path&gt; as module &lt;module-name&gt;.</p><p><strong>Example</strong>:</p><pre><code>nsh&gt; ls -l /mnt/romfs
/mnt/romfs:
 dr-xr-xr-x       0 .
 -r-xr-xr-x    9153 chardev
nsh&gt; ls -l /dev
/dev:
 crw-rw-rw-       0 console
 crw-rw-rw-       0 null
 brw-rw-rw-       0 ram0
 crw-rw-rw-       0 ttyS0
nsh&gt; lsmod
NAME                 INIT   UNINIT      ARG     TEXT     SIZE     DATA     SIZE
nsh&gt; insmod /mnt/romfs/chardev mydriver
nsh&gt; ls -l /dev
/dev:
 crw-rw-rw-       0 chardev
 crw-rw-rw-       0 console
 crw-rw-rw-       0 null
 brw-rw-rw-       0 ram0
 crw-rw-rw-       0 ttyS0
nsh&gt; lsmod
NAME                 INIT   UNINIT      ARG     TEXT     SIZE     DATA     SIZE
mydriver         20404659 20404625        0 20404580      552 204047a8        0
</code></pre><h2 id="irqinfo-show-interrupt-status" tabindex="-1"><code>irqinfo</code> Show Interrupt Status <a class="header-anchor" href="#irqinfo-show-interrupt-status" aria-label="Permalink to &quot;\`irqinfo\` Show Interrupt Status&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>irqinfo
</code></pre><p><strong>Synopsis</strong>. Show the current count of interrupts taken on all attached interrupts.</p><p><strong>Example</strong>:</p><pre><code>nsh&gt; irqinfo
IRQ HANDLER  ARGUMENT    COUNT    RATE
  3 00001b3d 00000000        156   19.122
 15 0000800d 00000000        817  100.000
 30 00000fd5 20000018         20    2.490
</code></pre><h2 id="critmon-show-critical-monitor-status" tabindex="-1"><code>critmon</code> Show Critical Monitor Status <a class="header-anchor" href="#critmon-show-critical-monitor-status" aria-label="Permalink to &quot;\`critmon\` Show Critical Monitor Status&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>critmon
</code></pre><p><strong>Synopsis</strong>. Show the preemption time, critical section time, longest single run time, total run time, process ID (PID), and thread description of each thread in the system.</p><p><strong>Example</strong>:</p><pre><code>nsh&gt; critmon
PRE-EMPTION   CSECTION      RUN         TIME         PID   DESCRIPTION
0.010265000   0.000037000   ----------- ------------ ----  CPU 0
0.000000000   0.000000000   0.001237000 28.421047000 0     Idle Task
0.000011000   0.000037000   0.000046000 0.034211000  1     loop_task
0.000000000   0.000028000   0.000067000 0.236657000  2     hpwork
</code></pre><p>In this example, the output shows the preemption time, critical section time, longest single run time, total run time, and thread description for each thread in the system.</p><p>The output of the <code>critmon</code> command displays the following columns:</p><ul><li>PRE-EMPTION: Preemption time</li><li>CSECTION: Critical section time</li><li>RUN: Longest single run time of the thread</li><li>TIME: Total run time of the thread</li><li>PID: Process ID of the thread</li><li>DESCRIPTION: Thread description (name)</li></ul><h2 id="kill-send-a-signal-to-a-task" tabindex="-1"><code>kill</code> Send a signal to a task <a class="header-anchor" href="#kill-send-a-signal-to-a-task" aria-label="Permalink to &quot;\`kill\` Send a signal to a task&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>kill -&lt;signal&gt; &lt;pid&gt;
</code></pre><p><strong>Synopsis</strong>. Send the &lt;signal&gt; to the task identified by &lt;pid&gt;.</p><p><strong>Example</strong>:</p><pre><code>nsh&gt; mkfifo /dev/fifo
nsh&gt; cat /dev/fifo &amp;
cat [2:128]
nsh&gt; ps
PID PRI POLICY   TYPE    NPX STATE    EVENT     SIGMASK  COMMAND
  0   0 FIFO     Kthread --- Ready              00000000 Idle Task
  1 128 RR       Task    --- Running            00000000 init
  2 128 FIFO     pthread --- Waiting  Semaphore 00000000 &lt;pthread&gt;(51ea50)
nsh&gt; kill -9 2
nsh&gt; ps
PID PRI POLICY   TYPE    NPX STATE    EVENT     SIGMASK  COMMAND
  0   0 FIFO     Kthread --- Ready              00000000 Idle Task
  1 128 RR       Task    --- Running            00000000 init
nsh&gt;
</code></pre><p>Note</p><p>NuttX does not support a FULL POSIX signaling system. A few standard signal names like <code>SIGCHLD</code>, <code>SIGUSR1</code>, <code>SIGUSR2</code>, <code>SIGALRM</code>, and <code>SIGPOLL</code> exist in the system. However, they do not have the default actions that you might expect. Rather, NuttX supports only what are referred to as POSIX real-time signals. These signals may be used to communicate with running tasks, may be use to waiting waiting tasks, etc.</p><p>If the configuration option <code>CONFIG_SIG_DEFAULT</code> is enabled, then default actions for the <code>SIGINT</code> and <code>SIGKILL</code> signals (only) will be supported. In that case, as an example, <code>kill -9</code> (SIGKILL) will, indeed, terminate a task. Caution should be exercised, however, because this is likely to cause memory leaks and to strand resource since there is insufficient clean-up in certain build configurations.</p><h2 id="losetup-setup-teardown-the-loop-device" tabindex="-1"><code>losetup</code> Setup/teardown the Loop Device <a class="header-anchor" href="#losetup-setup-teardown-the-loop-device" aria-label="Permalink to &quot;\`losetup\` Setup/teardown the Loop Device&quot;">​</a></h2><p><strong>Command Syntax 1</strong>:</p><pre><code>losetup [-o &lt;offset&gt;] [-r] &lt;dev-path&gt; &lt;file-path&gt;
</code></pre><p><strong>Synopsis</strong>. Setup the loop device at &lt;dev-path&gt; to access the file at &lt;file-path&gt; as a block device. In the following example a 256K file is created (<code>dd</code>) and <code>losetup</code> is used to make the file accessible as a block device. A FAT file system is created (<code>mkfatfs</code>) and mounted (<code>mount</code>). Files can then be managed on the loop-mounted file:</p><pre><code>nsh&gt; dd if=/dev/zero of=/tmp/image bs=512 count=512
nsh&gt; ls -l /tmp
/tmp:
 -rw-rw-rw-   262144 IMAGE
nsh&gt; losetup /dev/loop0 /tmp/image
nsh&gt; ls -l /dev
/dev:
 brw-rw-rw-       0 loop0
nsh&gt; mkfatfs /dev/loop0
nsh&gt; mount -t vfat /dev/loop0 /mnt/example
nsh&gt; ls -l /mnt
ls -l /mnt
/mnt:
 drw-rw-rw-       0 example/
nsh&gt; echo &quot;This is a test&quot; &gt;/mnt/example/atest.txt
nsh&gt; ls -l /mnt/example
/mnt/example:
 -rw-rw-rw-      16 ATEST.TXT
nsh&gt; cat /mnt/example/atest.txt
This is a test
nsh&gt;
</code></pre><p><strong>Command Syntax 2</strong>:</p><pre><code>losetup d &lt;dev-path&gt;
</code></pre><p><strong>Synopsis</strong>. Teardown the setup for the loop device at &lt;dev-path&gt;.</p><h2 id="ln-link-to-a-file-or-directory" tabindex="-1"><code>ln</code> Link to a File or Directory <a class="header-anchor" href="#ln-link-to-a-file-or-directory" aria-label="Permalink to &quot;\`ln\` Link to a File or Directory&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>ln [-s] &lt;target&gt; &lt;link&gt;
</code></pre><p><strong>Synopsis</strong>. The <code>ln</code> command will create a new symbolic link at &lt;link&gt; for the existing file or directory, &lt;target&gt;. This implementation is simplified for use with NuttX in these ways:</p><blockquote><ul><li>Links may be created only within the NuttX top-level, <code>pseudo file system &lt;file_system_overview&gt;</code>{.interpreted-text role=&quot;ref&quot;} No file system currently supported by NuttX provides symbolic links.</li><li>For the same reason, only soft links are implemented.</li><li>File privileges are ignored.</li><li><code>c_time</code> is not updated.</li></ul></blockquote><h2 id="ls-list-directory-contents" tabindex="-1"><code>ls</code> List Directory Contents <a class="header-anchor" href="#ls-list-directory-contents" aria-label="Permalink to &quot;\`ls\` List Directory Contents&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>ls [-lRsh] &lt;dir-path&gt;
</code></pre><p><strong>Synopsis</strong>. Show the contents of the directory at <code>&lt;dir-path&gt;</code>. NOTE: <code>&lt;dir-path&gt;</code> must refer to a directory and no other file system object.</p><p><strong>Options</strong></p><hr><p><code>-R</code> Show the contents of specified directory and all of its sub-directories. <code>-s</code> Show the size of the files along with the filenames in the listing <code>-l</code> Show size and mode information along with the filenames in the listing. <code>-h</code> Show size and mode information along with the filenames in the listing with humanable.</p><hr><h2 id="lsmod-show-information-about-installed-os-modules" tabindex="-1"><code>lsmod</code> Show information about installed OS modules <a class="header-anchor" href="#lsmod-show-information-about-installed-os-modules" aria-label="Permalink to &quot;\`lsmod\` Show information about installed OS modules&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>lsmod
</code></pre><p><strong>Synopsis</strong>. Show information about the currently installed OS modules. This information includes:</p><blockquote><ul><li>The module name assigned to the module when it was installed (<code>NAME</code>, string).</li><li>The address of the module initialization function (<code>INIT</code>, hexadecimal).</li><li>The address of the module un-initialization function (<code>UNINIT</code>, hexadecimal).</li><li>An argument that will be passed to the module un-initialization function (<code>ARG</code>, hexadecimal).</li><li>The start of the .text memory region (<code>TEXT</code>, hexadecimal).</li><li>The size of the .text memory region size (<code>SIZE</code>, decimal).</li><li>The start of the .bss/.data memory region (<code>DATA</code>, hexadecimal).</li><li>The size of the .bss/.data memory region size (<code>SIZE</code>, decimal).</li></ul></blockquote><p><strong>Example</strong>:</p><pre><code>nsh&gt; lsmod
NAME                 INIT   UNINIT      ARG     TEXT     SIZE     DATA     SIZE
mydriver         20404659 20404625        0 20404580      552 204047a8        0
</code></pre><h2 id="md5-calculate-md5" tabindex="-1"><code>md5</code> Calculate MD5 <a class="header-anchor" href="#md5-calculate-md5" aria-label="Permalink to &quot;\`md5\` Calculate MD5&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>md5 [-f] &lt;string or filepath&gt;
</code></pre><p><strong>Synopsis</strong>. <em>To be provided.</em></p><h2 id="mb-mh-and-mw-access-memory" tabindex="-1"><code>mb</code>, <code>mh</code>, <code>and</code> <code>mw</code> Access Memory <a class="header-anchor" href="#mb-mh-and-mw-access-memory" aria-label="Permalink to &quot;\`mb\`, \`mh\`, \`and\` \`mw\` Access Memory&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>mb &lt;hex-address&gt;[=&lt;hex-value&gt;][ &lt;hex-byte-count&gt;]
mh &lt;hex-address&gt;[=&lt;hex-value&gt;][ &lt;hex-byte-count&gt;]
mw &lt;hex-address&gt;[=&lt;hex-value&gt;][ &lt;hex-byte-count&gt;]
</code></pre><p><strong>Synopsis</strong>. Access memory using byte size access (mb), 16-bit accesses (mh), or 32-bit access (mw). In each case,</p><hr><p><code>&lt;hex-address&gt;</code> Specifies the address to be accessed. The current value at that address will always be read and displayed. <code>&lt;hex-address&gt;=&lt;hex-value&gt;</code> Read the value, then write &lt;hex-value&gt; to the location. <code>&lt;hex-byte-count&gt;</code> Perform the mb, mh, or mw operation on a total of &lt;hex-byte-count&gt; bytes, increment the &lt;hex-address&gt; appropriately after each access.</p><hr><p><strong>Example</strong>:</p><pre><code>nsh&gt; mh 0 16
  0 = 0x0c1e
  2 = 0x0100
  4 = 0x0c1e
  6 = 0x0110
  8 = 0x0c1e
  a = 0x0120
  c = 0x0c1e
  e = 0x0130
  10 = 0x0c1e
  12 = 0x0140
  14 = 0x0c1e
nsh&gt;
</code></pre><h2 id="ps-show-current-tasks-and-threads" tabindex="-1"><code>ps</code> Show Current Tasks and Threads <a class="header-anchor" href="#ps-show-current-tasks-and-threads" aria-label="Permalink to &quot;\`ps\` Show Current Tasks and Threads&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>ps
</code></pre><p><strong>Synopsis</strong>. Show the currently active threads and tasks. For example:</p><pre><code>nsh&gt; ps
PID PRI POLICY   TYPE    NPX STATE    EVENT     SIGMASK  COMMAND
  0   0 FIFO     Kthread --- Ready              00000000 Idle Task
  1 128 RR       Task    --- Running            00000000 init
  2 128 FIFO     Task    --- Waiting  Semaphore 00000000 nsh_telnetmain()
  3 100 RR       pthread --- Waiting  Semaphore 00000000 &lt;pthread&gt;(21)
nsh&gt;
</code></pre><p>NOTE: This commands depends upon having the <em>procfs</em> file system configured into the system. The <em>procfs</em> file system must also have been mounted with a command like:</p><pre><code>nsh&gt; mount -t procfs /proc
</code></pre><h2 id="mkdir-create-a-directory" tabindex="-1"><code>mkdir</code> Create a Directory <a class="header-anchor" href="#mkdir-create-a-directory" aria-label="Permalink to &quot;\`mkdir\` Create a Directory&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>mkdir &lt;path&gt;
</code></pre><p><strong>Synopsis</strong>. Create the directory at <code>&lt;path&gt;</code>. All components of <code>&lt;path&gt;</code> except the final directory name must exist on a mounted file system; the final directory must not.</p>`,268),e("p",null,[e("strong",null,"Limited to Mounted File Systems"),t(". Recall that NuttX uses a "),e("code",null,"pseudo file system <file_system_overview>"),t('{.interpreted-text role="ref"} for its root file system. The '),e("code",null,"mkdir"),t(" command can only be used to create directories in volumes set up with the "),e("code",{class:"interpreted-text",role:"ref"},"mount <cmdmount>"),t(" command; it cannot be used to create directories in the "),e("em",null,"pseudo"),t(" file system.")],-1),o(`<p><strong>Example</strong>:</p><pre><code>nsh&gt; mkdir /mnt/fs/tmp
nsh&gt; ls -l /mnt/fs
/mnt/fs:
 drw-rw-rw-       0 TESTDIR/
 drw-rw-rw-       0 TMP/
nsh&gt;
</code></pre><h2 id="mkfatfs-create-a-fat-file-system" tabindex="-1"><code>mkfatfs</code> Create a FAT File System <a class="header-anchor" href="#mkfatfs-create-a-fat-file-system" aria-label="Permalink to &quot;\`mkfatfs\` Create a FAT File System&quot;">​</a></h2><p><strong>Command Syntax</strong></p><blockquote><p>mkfatfs [-F &lt;fatsize&gt;] [-r &lt;rootdirentries&gt;] &lt;block-driver&gt;</p></blockquote><p><strong>Synopsis</strong>. Format a fat file system on the block device specified by <code>&lt;block-driver&gt;</code> path. The FAT size may be provided as an option. Without the <code>&lt;fatsize&gt;</code> option, <code>mkfatfs</code> will select either the FAT12 or FAT16 format. For historical reasons, if you want the FAT32 format, it must be explicitly specified on the command line.</p><p>The <code>-r</code> option may be specified to select the the number of entries in the root directory for FAT12 and FAT16 file systems. Typical values for small volumes would be 112 or 224; 512 should be used for large volumes, such as hard disks or very large SD cards. The default is 512 entries in all cases.</p><p>The reported number of root directory entries used with FAT32 is zero because the FAT32 root directory is a cluster chain.</p><p>NSH provides this command to access the <code>mkfatfs()</code> NuttX API. This block device must reside in the NuttX <code>pseudo file system &lt;file_system_overview&gt;</code>{.interpreted-text role=&quot;ref&quot;} and must have been created by some call to <code>register_blockdriver()</code> (see <code>include/nuttx/fs/fs.h</code>).</p><h2 id="mkfifo-create-a-fifo" tabindex="-1"><code>mkfifo</code> Create a FIFO <a class="header-anchor" href="#mkfifo-create-a-fifo" aria-label="Permalink to &quot;\`mkfifo\` Create a FIFO&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>mkfifo &lt;path&gt;
</code></pre><p><strong>Synopsis</strong>. Creates a FIFO character device anywhere in the pseudo file system, creating whatever pseudo directories that may be needed to complete the <code>&lt;path&gt;</code>. By convention, however, device drivers are place in the standard <code>/dev</code> directory. After it is created, the FIFO device may be used as any other device driver. NSH provides this command to access the <code>\`mkfifo()</code> NuttX API.</p><p><strong>Example</strong>:</p><pre><code>nsh&gt; ls -l /dev
/dev:
 crw-rw-rw-       0 console
 crw-rw-rw-       0 null
 brw-rw-rw-       0 ram0
nsh&gt; mkfifo /dev/fifo
nsh&gt; ls -l /dev
ls -l /dev
/dev:
 crw-rw-rw-       0 console
 crw-rw-rw-       0 fifo
 crw-rw-rw-       0 null
 brw-rw-rw-       0 ram0
nsh&gt;
</code></pre><h2 id="mkrd-create-a-ramdisk" tabindex="-1"><code>mkrd</code> Create a RAMDISK <a class="header-anchor" href="#mkrd-create-a-ramdisk" aria-label="Permalink to &quot;\`mkrd\` Create a RAMDISK&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>mkrd [-m &lt;minor&gt;] [-s &lt;sector-size&gt;] &lt;nsectors&gt;
</code></pre><p><strong>Synopsis</strong>. Create a ramdisk consisting of <code>&lt;nsectors&gt;</code>, each of size <code>&lt;sector-size&gt;</code> (or 512 bytes if <code>&lt;sector-size&gt;</code> is not specified. The ramdisk will be registered as <code>/dev/ram&lt;minor&gt;</code>. If <code>&lt;minor&gt;</code> is not specified, <code>mkrd</code> will attempt to register the ramdisk as <code>/dev/ram0</code>.</p><p><strong>Example</strong>:</p><pre><code>nsh&gt; ls /dev
/dev:
 console
 null
 ttyS0
 ttyS1
nsh&gt; mkrd 1024
nsh&gt; ls /dev
/dev:
 console
 null
 ram0
 ttyS0
 ttyS1
nsh&gt;
</code></pre><p>Once the ramdisk has been created, it may be formatted using the <code>mkfatfs</code> command and mounted using the <code>mount</code> command.</p><p><strong>Example</strong>:</p><pre><code>nsh&gt; mkrd 1024
nsh&gt; mkfatfs /dev/ram0
nsh&gt; mount -t vfat /dev/ram0 /tmp
nsh&gt; ls /tmp
/tmp:
nsh&gt;
</code></pre><h2 id="mount-mount-a-file-system" tabindex="-1"><code>mount</code> Mount a File System <a class="header-anchor" href="#mount-mount-a-file-system" aria-label="Permalink to &quot;\`mount\` Mount a File System&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>mount -t &lt;fstype&gt; [-o &lt;options&gt;] &lt;block-device&gt; &lt;dir-path&gt;
</code></pre><p><strong>Synopsis</strong>. The <code>mount</code> command performs one of two different operations. If no parameters are provided on the command line after the <code>mount</code> command, then the <code>mount</code> command will enumerate all of the current mountpoints on the console.</p><p>If the mount parameters are provided on the command after the <code>mount</code> command, then the <code>mount</code> command will mount a file system in the NuttX pseudo-file system. <code>mount</code> performs a three way association, binding:</p><blockquote><ol><li><strong>File System.</strong> The &#39;-t <code>&lt;fstype&gt;</code>&#39; option identifies the type of file system that has been formatted on the <code>&lt;block-device&gt;</code>. As of this writing, <code>vfat</code> is the only supported value for <code>&lt;fstype&gt;</code></li><li><strong>Block Device.</strong> The <code>&lt;block-device&gt;</code> argument is the full or relative path to a block driver inode in the <code>pseudo file system &lt;file_system_overview&gt;</code>{.interpreted-text role=&quot;ref&quot;}. By convention, this is a name under the <code>/dev</code> sub-directory. This <code>&lt;block-device&gt;</code> must have been previously formatted with the same file system type as specified by <code>&lt;fstype&gt;</code></li><li><strong>Mount Point.</strong> The mount point, <code>&lt;dir-path&gt;</code>, is the location in the <code>pseudo file system &lt;file_system_overview&gt;</code>{.interpreted-text role=&quot;ref&quot;} where the mounted volume will appear. This mount point can only reside in the NuttX <code>pseudo file system &lt;file_system_overview&gt;</code>{.interpreted-text role=&quot;ref&quot;}. By convention, this mount point is a subdirectory under <code>/mnt</code>. The mount command will create whatever pseudo directories that may be needed to complete the full path but the full path must not already exist.</li></ol></blockquote><p>After the volume has been mounted in the NuttX <code>pseudo file system &lt;file_system_overview&gt;</code>{.interpreted-text role=&quot;ref&quot;}, it may be access in the same way as other objects in the file system.</p><p><strong>Examples</strong>:</p><p>Using <code>mount</code> to mount a file system:</p><pre><code>nsh&gt; ls -l /dev
/dev:
 crw-rw-rw-       0 console
 crw-rw-rw-       0 null
 brw-rw-rw-       0 ram0
nsh&gt; ls /mnt
nsh: ls: no such directory: /mnt
nsh&gt; mount -t vfat /dev/ram0 /mnt/fs
nsh&gt; ls -l /mnt/fs/testdir
/mnt/fs/testdir:
 -rw-rw-rw-      15 TESTFILE.TXT
nsh&gt; echo &quot;This is a test&quot; &gt;/mnt/fs/testdir/example.txt
nsh&gt; ls -l /mnt/fs/testdir
/mnt/fs/testdir:
-rw-rw-rw-      15 TESTFILE.TXT
 -rw-rw-rw-      16 EXAMPLE.TXT
nsh&gt; cat /mnt/fs/testdir/example.txt
This is a test
nsh&gt;
</code></pre><p>Using <code>mount</code> to enumerate mounts:</p><pre><code>nsh&gt; mount
  /etc type romfs
  /mnt/fs type vfat
  /tmp type vfat
</code></pre><h2 id="mv-rename-a-file" tabindex="-1"><code>mv</code> Rename a File <a class="header-anchor" href="#mv-rename-a-file" aria-label="Permalink to &quot;\`mv\` Rename a File&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>mv &lt;old-path&gt; &lt;new-path&gt;
</code></pre><p><strong>Synopsis</strong>. Rename the file object at <code>&lt;old-path&gt;</code> to <code>&lt;new-path&gt;</code>. Both paths must reside in the same mounted file system.</p><h2 id="nfsmount-mount-an-nfs-file-system" tabindex="-1"><code>nfsmount</code> Mount an NFS file system <a class="header-anchor" href="#nfsmount-mount-an-nfs-file-system" aria-label="Permalink to &quot;\`nfsmount\` Mount an NFS file system&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>nfsmount &lt;server-address&gt; &lt;mount-point&gt; &lt;remote-path&gt;
</code></pre><p><strong>Synopsis</strong>. Mount the remote NFS server directory&lt;remote-path&gt; at &lt;mount-point&gt; on the target machine. &lt;server-address&gt; is the IP address of the remote server.</p><h2 id="nslookup-lookup-a-network-address" tabindex="-1"><code>nslookup</code> Lookup a network address <a class="header-anchor" href="#nslookup-lookup-a-network-address" aria-label="Permalink to &quot;\`nslookup\` Lookup a network address&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>nslookup &lt;host-name&gt;
</code></pre><p><strong>Synopsis</strong>. Lookup and print the IP address associated with <code>&lt;host-name&gt;</code>.</p><h2 id="passwd-change-a-user-s-password" tabindex="-1"><code>passwd</code> Change a User&#39;s Password <a class="header-anchor" href="#passwd-change-a-user-s-password" aria-label="Permalink to &quot;\`passwd\` Change a User\\&#39;s Password&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>passwd &lt;username&gt; &lt;password&gt;
</code></pre><p><strong>Synopsis</strong>. Set the password for the existing user &lt;username&gt; to &lt;password&gt;.</p><h2 id="pmconfig-manage-power-management-subsystem" tabindex="-1"><code>pmconfig</code> Manage Power Management Subsystem <a class="header-anchor" href="#pmconfig-manage-power-management-subsystem" aria-label="Permalink to &quot;\`pmconfig\` Manage Power Management Subsystem&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>pmconfig [stay|relax] [normal|idle|standby|sleep]
</code></pre><p><strong>Synopsis</strong>. Control power management subsystem.</p><h2 id="poweroff-shut-the-system-down" tabindex="-1"><code>poweroff</code> Shut the system down <a class="header-anchor" href="#poweroff-shut-the-system-down" aria-label="Permalink to &quot;\`poweroff\` Shut the system down&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>poweroff [&lt;n&gt;]
</code></pre><p><strong>Synopsis</strong>. Shutdown and power off the system immediately. This command depends on board-specific hardware support to power down the system. The optional,decimal numeric argument may be included to provide power off mode to board-specific power off logic.</p><p>NOTE: Supporting both the <code>poweroff</code> and <code>shutdown</code> commands is redundant.</p><h2 id="put-send-file-via-tftp" tabindex="-1"><code>put</code> Send File Via TFTP <a class="header-anchor" href="#put-send-file-via-tftp" aria-label="Permalink to &quot;\`put\` Send File Via TFTP&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>put [-b|-n] [-f &lt;remote-path&gt;] -h &lt;ip-address&gt; &lt;local-path&gt;
</code></pre><p><strong>Synopsis</strong>. Copy the file at <code>&lt;local-address&gt;</code> to the host whose IP address is identified by <code>&lt;ip-address&gt;</code>.</p><p><strong>Other options:</strong></p><hr><p><code>-f &lt;remote-path&gt;</code> The file will be saved relative with the same name on the host unless &lt;remote-path&gt; is provided. <code>-b|-n</code> Selects either binary (&quot;octet&quot;) or text (&quot;netascii&quot;) transfer mode. Default: text.</p><hr><h2 id="pwd-show-current-working-directory" tabindex="-1"><code>pwd</code> Show Current Working Directory <a class="header-anchor" href="#pwd-show-current-working-directory" aria-label="Permalink to &quot;\`pwd\` Show Current Working Directory&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>pwd
</code></pre><p><strong>Synopsis</strong>. Show the current working directory:</p><pre><code>nsh&gt; cd /dev
nsh&gt; pwd
/dev
nsh&gt;
</code></pre><p>Same as <code>echo PWD</code>:</p><pre><code>nsh&gt; echo PWD
/dev
nsh&gt;
</code></pre><h2 id="readlink-show-target-of-a-link" tabindex="-1"><code>readlink</code> Show target of a link <a class="header-anchor" href="#readlink-show-target-of-a-link" aria-label="Permalink to &quot;\`readlink\` Show target of a link&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>readlink &lt;link&gt;
</code></pre><p><strong>Synopsis</strong>. Show the target of the soft link at the path <code>&lt;link&gt;</code>.</p><h2 id="reboot-reboot-the-system" tabindex="-1"><code>reboot</code> Reboot the system <a class="header-anchor" href="#reboot-reboot-the-system" aria-label="Permalink to &quot;\`reboot\` Reboot the system&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>reboot [&lt;n&gt;]
</code></pre><p><strong>Synopsis</strong>. Reset and reboot the system immediately. This command depends on hardware support to reset the system. The optional, decimal numeric argument &lt;n&gt; may be included to provide a reboot mode to board-specific reboot logic.</p><p>NOTE: Supporting both the <code>reboot</code> and <code>shutdown</code> commands is redundant.</p><h2 id="rm-remove-a-file" tabindex="-1"><code>rm</code> Remove a File <a class="header-anchor" href="#rm-remove-a-file" aria-label="Permalink to &quot;\`rm\` Remove a File&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>rm &lt;file-path&gt;
</code></pre>`,88),e("p",null,[e("strong",null,"Synopsis"),t(". Remove the specified "),e("code",null,"<file-path>"),t(" name from the mounted file system. Recall that NuttX uses a "),e("code",null,"pseudo file system <file_system_overview>"),t('{.interpreted-text role="ref"} for its root file system. The '),e("code",null,"rm"),t(" command can only be used to remove (unlink) files in volumes set up with the "),e("code",{class:"interpreted-text",role:"ref"},"mount <cmdmount>"),t(" command; it cannot be used to remove names in the "),e("em",null,"pseudo"),t(" file system.")],-1),o(`<p><strong>Example</strong>:</p><pre><code>nsh&gt; ls /mnt/fs/testdir
/mnt/fs/testdir:
 TESTFILE.TXT
 EXAMPLE.TXT
nsh&gt; rm /mnt/fs/testdir/example.txt
nsh&gt; ls /mnt/fs/testdir
/mnt/fs/testdir:
 TESTFILE.TXT
nsh&gt;
</code></pre><h2 id="rmdir-remove-a-directory" tabindex="-1"><code>rmdir</code> Remove a Directory <a class="header-anchor" href="#rmdir-remove-a-directory" aria-label="Permalink to &quot;\`rmdir\` Remove a Directory&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>rmdir &lt;dir-path&gt;
</code></pre>`,5),e("p",null,[e("strong",null,"Synopsis"),t(". Remove the specified "),e("code",null,"<dir-path>"),t(" directory from the mounted file system. Recall that NuttX uses a "),e("code",null,"pseudo file system <file_system_overview>"),t('{.interpreted-text role="ref"} for its root file system. The '),e("code",null,"rmdir"),t(" command can only be used to remove directories from volumes set up with the "),e("code",{class:"interpreted-text",role:"ref"},"mount <cmdmount>"),t(" command it cannot be used to remove directories from the "),e("em",null,"pseudo"),t(" file system.")],-1),o(`<p><strong>Example</strong>:</p><pre><code>nsh&gt; mkdir /mnt/fs/tmp
nsh&gt; ls -l /mnt/fs
/mnt/fs:
 drw-rw-rw-       0 TESTDIR/
 drw-rw-rw-       0 TMP/
nsh&gt; rmdir /mnt/fs/tmp
nsh&gt; ls -l /mnt/fs
/mnt/fs:
 drw-rw-rw-       0 TESTDIR/
nsh&gt;
</code></pre><h2 id="rmmod-remove-on-os-module" tabindex="-1"><code>rmmod</code> Remove on OS Module <a class="header-anchor" href="#rmmod-remove-on-os-module" aria-label="Permalink to &quot;\`rmmod\` Remove on OS Module&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>rmmod &lt;module-name&gt;
</code></pre><p><strong>Synopsis</strong>. Remove the loadable OS module with the &lt;module-name&gt;. NOTE: An OS module can only be removed if it is not busy.</p><p><strong>Example</strong>:</p><pre><code>nsh&gt; lsmod
NAME                 INIT   UNINIT      ARG     TEXT     SIZE     DATA     SIZE
mydriver         20404659 20404625        0 20404580      552 204047a8        0
nsh&gt; rmmod mydriver
nsh&gt; lsmod
NAME                 INIT   UNINIT      ARG     TEXT     SIZE     DATA     SIZE
nsh&gt;
</code></pre><h2 id="route-show-routing-table" tabindex="-1"><code>route</code> Show routing table <a class="header-anchor" href="#route-show-routing-table" aria-label="Permalink to &quot;\`route\` Show routing table&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>route ipv4|ipv6
</code></pre><p><strong>Synopsis</strong>. Show the contents of routing table for IPv4 or IPv6.</p><p>If only IPv4 or IPv6 is enabled, then the argument is optional but, if provided, must match the enabled internet protocol version.</p><h2 id="rptun-start-stop-the-openamp-rpc-tunnel" tabindex="-1"><code>rptun</code> Start/Stop the OpenAMP RPC Tunnel <a class="header-anchor" href="#rptun-start-stop-the-openamp-rpc-tunnel" aria-label="Permalink to &quot;\`rptun\` Start/Stop the OpenAMP RPC Tunnel&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>rptun start|stop &lt;dev-path&gt;
</code></pre><p><strong>Synopsis</strong>. Start or stop the OpenAMP RPC tunnel device at &lt;dev-path&gt;.</p><h2 id="set-set-a-variable" tabindex="-1"><code>set</code> Set a Variable <a class="header-anchor" href="#set-set-a-variable" aria-label="Permalink to &quot;\`set\` Set a Variable&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>set [{+|-}{e|x|xe|ex}] [&lt;name&gt; &lt;value&gt;]
</code></pre><p><strong>Synopsis</strong>. Set the variable <code>&lt;name&gt;</code> to the string <code>&lt;value&gt;</code> and or set NSH parser control options.</p><p>For example, a variable may be set like this:</p><pre><code>nsh&gt; echo foobar

nsh&gt; set foobar foovalue
nsh&gt; echo foobar
foovalue
nsh&gt;
</code></pre><p>If <code>CONFIG_NSH_VARS</code> is selected, the effect of this <code>set</code> command is to set the local NSH variable. Otherwise, the group-wide environment variable will be set.</p>`,24),e("p",null,[t("If the local NSH variable has already been "),e("em",null,"promoted"),t(" to an environment variable via the "),e("code",{class:"interpreted-text",role:"ref"},"export <cmdexport>"),t(", then the "),e("code",null,"set"),t(" command will set the value of the environment variable rather than the local NSH variable.")],-1),o(`<p>Note</p><p>The Bash shell does not work this way. Bash would set the value of both the local Bash variable and the environment variable of the same name to the same value.</p><p>If <code>CONFIG_NSH_VARS=y</code> is selected and no arguments are provided, then the <code>set</code> command will list all of the local NSH variables:</p><pre><code>nsh&gt; set
foolbar=foovalue
</code></pre><p>Set the <em>exit on error control</em> and/or <em>print a trace</em> of commands when parsing scripts in NSH. The settings are in effect from the point of execution, until they are changed again, or in the case of the initialization script, the settings are returned to the default settings when it exits. Included child scripts will run with the parents settings and changes made in the child script will effect the parent on return.</p><blockquote><ul><li>Use <code>set -e</code> to enable and <code>set +e</code> to disable (ignore) the exit condition on commands. The default is -e. Errors cause script to exit.</li><li>Use <code>set -x</code> to enable and <code>set +x</code> to disable (silence) printing a trace of the script commands as they are executed. The default is <code>+x</code>: no printing of a trace of script commands as they are executed.</li></ul></blockquote><p>Example 1 - no exit on command not found:</p><pre><code>set +e
notacommand
</code></pre><p>Example 2 - will exit on command not found:</p><pre><code>set -e
notacommand
</code></pre><p>Example 3 - will exit on command not found, and print a trace of the script commands:</p><pre><code>set -ex
</code></pre><p>Example 4 - will exit on command not found, and print a trace of the script commands and set foobar to foovalue:</p><pre><code>set -ex foobar foovalue
nsh&gt; echo foobar
foovalue
</code></pre><h2 id="sh-execute-an-nsh-script" tabindex="-1"><code>sh</code> Execute an NSH Script <a class="header-anchor" href="#sh-execute-an-nsh-script" aria-label="Permalink to &quot;\`sh\` Execute an NSH Script&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>sh &lt;script-path&gt;
</code></pre><p><strong>Synopsis</strong>. Execute the sequence of NSH commands in the file referred to by <code>&lt;script-path&gt;</code>.</p><h2 id="shutdown-shut-the-system-down" tabindex="-1"><code>shutdown</code> Shut the system down <a class="header-anchor" href="#shutdown-shut-the-system-down" aria-label="Permalink to &quot;\`shutdown\` Shut the system down&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>shutdown [--reboot]
</code></pre><p><strong>Synopsis</strong>. Shutdown and power off the system or, optionally, reset and reboot the system immediately. This command depends on hardware support to power down or reset the system; one, both, or neither behavior may be supported.</p><p>NOTE: The <code>shutdown</code> command duplicates the behavior of the <code>poweroff</code> and <code>eboot</code> commands.</p><h2 id="sleep-wait-for-seconds" tabindex="-1"><code>sleep</code> Wait for Seconds <a class="header-anchor" href="#sleep-wait-for-seconds" aria-label="Permalink to &quot;\`sleep\` Wait for Seconds&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>sleep &lt;sec&gt;
</code></pre><p><strong>Synopsis</strong>. Pause execution (sleep) for <code>&lt;sec&gt;</code> seconds.</p><h2 id="telnetd-time-start-the-telnet-daemon" tabindex="-1"><code>telnetd</code> Time Start the Telnet Daemon <a class="header-anchor" href="#telnetd-time-start-the-telnet-daemon" aria-label="Permalink to &quot;\`telnetd\` Time Start the Telnet Daemon&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>telnetd
</code></pre><p><strong>Synopsis</strong>. Start the Telnet daemon if it is not already running.</p><p>The Telnet daemon may be started either programmatically by calling <code>nsh_telnetstart()</code> or it may be started from the NSH command line using this <code>telnetd</code> command.</p><p>Normally this command would be suppressed without <code>CONFIG_SYSTEM_TELNETD</code> because the Telnet daemon is automatically started in <code>nsh_main.c</code>. The exception is when <code>CONFIG_NSH_NETLOCAL</code> is selected. In that case, the network is not enabled at initialization but rather must be enabled from the NSH command line or via other applications.</p><p>In that case, when <code>nsh_telnetstart()</code> is called before the the network is initialized, it will fail.</p><h2 id="time-time-execution-of-another-command" tabindex="-1"><code>time</code> Time execution of another command <a class="header-anchor" href="#time-time-execution-of-another-command" aria-label="Permalink to &quot;\`time\` Time execution of another command&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>time &quot;&lt;command&gt;&quot;
</code></pre><p><strong>Synopsis</strong>. Perform command timing. This command will execute the following &lt;command&gt; string and then show how much time was required to execute the command. Time is shown with a resolution of 100 microseconds which may be beyond the resolution of many configurations. Note that the &lt;command&gt; must be enclosed in quotation marks if it contains spaces or other delimiters.</p><p><strong>Example</strong>:</p><pre><code>nsh&gt; time &quot;sleep 2&quot;

2.0100 sec
nsh&gt;
</code></pre><p>The additional 10 milliseconds in this example is due to the way that the sleep command works: It always waits one system clock tick longer than requested and this test setup used a 10 millisecond periodic system timer. Sources of error could include various quantization errors, competing CPU usage, and the additional overhead of the time command execution itself which is included in the total.</p><p>The reported time is the elapsed time from starting of the command to completion of the command. This elapsed time may not necessarily be just the processing time for the command. It may included interrupt level processing, for example. In a busy system, command processing could be delayed if preempted by other, higher priority threads competing for CPU time. So the reported time includes all CPU processing from the start of the command to its finish possibly including unrelated processing time during that interval.</p><p>Notice that:</p><pre><code>nsh&gt; time &quot;sleep 2 &amp;&quot;
sleep [3:100]

0.0000 sec
nsh&gt;
</code></pre><p>Since the sleep command is executed in background, the sleep command completes almost immediately. As opposed to the following where the time command is run in background with the sleep command:</p><pre><code>nsh&gt; time &quot;sleep 2&quot; &amp;
time [3:100]
nsh&gt;
2.0100 sec
</code></pre><h2 id="truncate-set-the-size-of-a-file" tabindex="-1"><code>truncate</code> Set the Size of a File <a class="header-anchor" href="#truncate-set-the-size-of-a-file" aria-label="Permalink to &quot;\`truncate\` Set the Size of a File&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>truncate -s &lt;length&gt; &lt;file-path&gt;
</code></pre><p><strong>Synopsis</strong>. Shrink or extend the size of the regular file at &lt;file-path&gt; to the specified&lt;length&gt;.</p><p>A &lt;file-path&gt; argument that does not exist is created. The &lt;length&gt; option is NOT optional.</p><p>If a &lt;file-path&gt; is larger than the specified size, the extra data is lost. If a &lt;file-path&gt; is shorter, it is extended and the extended part reads as zero bytes.</p><h2 id="umount-unmount-a-file-system" tabindex="-1"><code>umount</code> Unmount a File System <a class="header-anchor" href="#umount-unmount-a-file-system" aria-label="Permalink to &quot;\`umount\` Unmount a File System&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>umount &lt;dir-path&gt;
</code></pre>`,55),e("p",null,[e("strong",null,"Synopsis"),t(". Un-mount the file system at mount point "),e("code",null,"<dir-path>"),t(". The "),e("code",null,"umount"),t(" command can only be used to un-mount volumes previously mounted using "),e("code",{class:"interpreted-text",role:"ref"},"mount <cmdmount>"),t(" command.")],-1),o(`<p><strong>Example</strong>:</p><pre><code>nsh&gt; ls /mnt/fs
/mnt/fs:
 TESTDIR/
nsh&gt; umount /mnt/fs
nsh&gt; ls /mnt/fs
/mnt/fs:
nsh: ls: no such directory: /mnt/fs
nsh&gt;
</code></pre><h2 id="uname-print-system-information" tabindex="-1"><code>uname</code> Print system information <a class="header-anchor" href="#uname-print-system-information" aria-label="Permalink to &quot;\`uname\` Print system information&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>uname [-a | -imnoprsv]
</code></pre><p><strong>Synopsis</strong>. Print certain system information. With no options, the output is the same as -s.</p><hr><p><code>-a</code> Print all information, in the following order, except omit -p and -i if unknown: <code>-s, -o</code> Print the operating system name (NuttX) <code>-n</code> Print the network node hostname (only available if CONFIG_NET=y) <code>-r</code> Print the kernel release <code>-v</code> Print the kernel version <code>-m</code> Print the machine hardware name <code>-i</code> Print the machine platform name <code>-p</code> Print &quot;unknown&quot;</p><hr><h2 id="unset-unset-an-environment-variable" tabindex="-1"><code>unset</code> Unset an Environment Variable <a class="header-anchor" href="#unset-unset-an-environment-variable" aria-label="Permalink to &quot;\`unset\` Unset an Environment Variable&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><blockquote><p>unset &lt;name&gt;</p></blockquote><p><strong>Synopsis</strong>. Remove the value associated with the variable <code>&lt;name&gt;</code>. This will remove the name-value pair from both the NSH local variables and the group-wide environment variables. For example:</p><pre><code>nsh&gt; echo foobar
foovalue
nsh&gt; unset foobar
nsh&gt; echo foobar

nsh&gt;
</code></pre><h2 id="uptime-show-how-long-the-system-has-been-running" tabindex="-1"><code>uptime</code> Show how long the system has been running <a class="header-anchor" href="#uptime-show-how-long-the-system-has-been-running" aria-label="Permalink to &quot;\`uptime\` Show how long the system has been running&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><blockquote><p>uptime [-sph]</p></blockquote><p><strong>Synopsis</strong>. Display of the following information: the current time, how long the system has been running, and the load averages for the past 1, 5, and 15 minutes.</p><p><strong>Options</strong></p><hr><p><code>-p</code> show uptime in pretty format <code>-s</code> system up since <code>-h</code> display this help and exit</p><hr><h2 id="urldecode-url-decode" tabindex="-1"><code>urldecode</code> URL Decode <a class="header-anchor" href="#urldecode-url-decode" aria-label="Permalink to &quot;\`urldecode\` URL Decode&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>urldecode [-f] &lt;string or filepath&gt;
</code></pre><p><strong>Synopsis</strong>. <em>To be provided.</em></p><h2 id="urlencode-url-encode" tabindex="-1"><code>urlencode</code> URL Encode <a class="header-anchor" href="#urlencode-url-encode" aria-label="Permalink to &quot;\`urlencode\` URL Encode&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>urlencode [-f] &lt;string or filepath&gt;
</code></pre><p><strong>Synopsis</strong>. <em>To be provided.</em></p><h2 id="useradd-add-a-new-user" tabindex="-1"><code>useradd</code> Add a New User <a class="header-anchor" href="#useradd-add-a-new-user" aria-label="Permalink to &quot;\`useradd\` Add a New User&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>useradd &lt;username&gt; &lt;password&gt;
</code></pre><p><strong>Synopsis</strong>. Add a new user with &lt;username&gt; and &lt;password&gt;.</p><h2 id="userdel-delete-a-user" tabindex="-1"><code>userdel</code> Delete a user <a class="header-anchor" href="#userdel-delete-a-user" aria-label="Permalink to &quot;\`userdel\` Delete a user&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>userdel &lt;username&gt;
</code></pre><p><strong>Synopsis</strong>. Delete the user with the name &lt;username&gt;.</p><h2 id="usleep-wait-for-microseconds" tabindex="-1"><code>usleep</code> Wait for Microseconds <a class="header-anchor" href="#usleep-wait-for-microseconds" aria-label="Permalink to &quot;\`usleep\` Wait for Microseconds&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>usleep &lt;usec&gt;
</code></pre><p><strong>Synopsis</strong>. Pause execution (sleep) of <code>&lt;usec&gt;</code> microseconds.</p><h2 id="wget-get-file-via-http" tabindex="-1"><code>wget</code> Get File Via HTTP <a class="header-anchor" href="#wget-get-file-via-http" aria-label="Permalink to &quot;\`wget\` Get File Via HTTP&quot;">​</a></h2><p><strong>Command Syntax</strong></p><blockquote><p>wget [-o &lt;local-path&gt;] &lt;url&gt;</p></blockquote><p><strong>Synopsis</strong>. Use HTTP to copy the file at <code>&lt;url&gt;</code> to the current directory.</p><p><strong>Options</strong></p><hr><p><code>-o &lt;local-path&gt;</code> The file will be saved relative to the current working directory and with the same name as on the HTTP server unless &lt;local-path&gt; is provided.</p><hr><h2 id="xd-hexadecimal-dump-of-memory" tabindex="-1"><code>xd</code> Hexadecimal Dump of Memory <a class="header-anchor" href="#xd-hexadecimal-dump-of-memory" aria-label="Permalink to &quot;\`xd\` Hexadecimal Dump of Memory&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>xd &lt;hex-address&gt; &lt;byte-count&gt;
</code></pre><p><strong>Synopsis</strong>. Dump <code>&lt;byte-count&gt;</code> bytes of data from address <code>&lt;hex-address&gt;</code>.</p><p><strong>Example</strong>:</p><pre><code>nsh&gt; xd 410e0 512
Hex dump:
0000: 00 00 00 00 9c 9d 03 00 00 00 00 01 11 01 10 06 ................
0010: 12 01 11 01 25 08 13 0b 03 08 1b 08 00 00 02 24 ....%..........
...
01f0: 08 3a 0b 3b 0b 49 13 00 00 04 13 01 01 13 03 08 .:.;.I..........
nsh&gt;
</code></pre><h2 id="built-in-commands" tabindex="-1">Built-In Commands <a class="header-anchor" href="#built-in-commands" aria-label="Permalink to &quot;Built-In Commands&quot;">​</a></h2><p>In addition to the commands that are part of NSH listed in the previous section above, there can be additional, external <em>built-in</em> applications that can be added to NSH. These are separately excecuble programs but will appear much like the commands that are a part of NSH. The primary difference from the user&#39;s perspective is that help information about the built-in applications is not available directly from NSH. Rather, you will need to execute the application with the <code>-h</code> option to get help about using the built-in applications.</p><p>There are several built-in applications in the <code>apps/</code> repository. No attempt is made here to enumerate all of them. But a few of the more common, useful built-in applications are listed below.</p><h2 id="ping-and-ping6-check-network-peer" tabindex="-1"><code>ping</code> and <code>ping6</code> Check Network Peer <a class="header-anchor" href="#ping-and-ping6-check-network-peer" aria-label="Permalink to &quot;\`ping\` and \`ping6\` Check Network Peer&quot;">​</a></h2><p><strong>Command Syntax</strong>:</p><pre><code>ping  [-c &lt;count&gt;] [-i &lt;interval&gt;] &lt;ip-address&gt;
ping6 [-c &lt;count&gt;] [-i &lt;interval&gt;] &lt;ip-address&gt;
</code></pre><p><strong>Synopsis</strong>. Test the network communication with a remote peer. Example:</p><pre><code>nsh&gt; ping 10.0.0.1
PING 10.0.0.1 56 bytes of data
56 bytes from 10.0.0.1: icmp_seq=1 time=0 ms
56 bytes from 10.0.0.1: icmp_seq=2 time=0 ms
56 bytes from 10.0.0.1: icmp_seq=3 time=0 ms
56 bytes from 10.0.0.1: icmp_seq=4 time=0 ms
56 bytes from 10.0.0.1: icmp_seq=5 time=0 ms
56 bytes from 10.0.0.1: icmp_seq=6 time=0 ms
56 bytes from 10.0.0.1: icmp_seq=7 time=0 ms
56 bytes from 10.0.0.1: icmp_seq=8 time=0 ms
56 bytes from 10.0.0.1: icmp_seq=9 time=0 ms
56 bytes from 10.0.0.1: icmp_seq=10 time=0 ms
10 packets transmitted, 10 received, 0% packet loss, time 10190 ms
nsh&gt;
</code></pre><p><code>ping6</code> differs from <code>ping</code> in that it uses IPv6 addressing.</p>`,65)]))}const f=a(d,[["render",i]]);export{g as __pageData,f as default};
