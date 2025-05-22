import{_ as t,c as n,al as a,o as i}from"./chunks/framework.NFAqBSgQ.js";const g=JSON.parse('{"title":"btsak Bluetooth Swiss Army Knife","description":"","frontmatter":{},"headers":[],"relativePath":"en/applications/wireless/btsak/index.md","filePath":"en/applications/wireless/btsak/index.md"}'),o={name:"en/applications/wireless/btsak/index.md"};function r(d,e,s,c,p,l){return i(),n("div",null,e[0]||(e[0]=[a(`<h1 id="btsak-bluetooth-swiss-army-knife" tabindex="-1"><code>btsak</code> Bluetooth Swiss Army Knife <a class="header-anchor" href="#btsak-bluetooth-swiss-army-knife" aria-label="Permalink to &quot;\`btsak\` Bluetooth Swiss Army Knife&quot;">​</a></h1><h2 id="commands" tabindex="-1">Commands <a class="header-anchor" href="#commands" aria-label="Permalink to &quot;Commands&quot;">​</a></h2><p>help:</p><pre><code>Command:      help
Description:  Should overall command help
Usage:        bt &lt;ifname&gt; help
</code></pre><p>info:</p><pre><code>Command:      info
Description:  Show Bluetooth driver information
Usage:        bt &lt;ifname&gt; info [-h]
</code></pre><p>features:</p><pre><code>Command:      features
Description:  Show Bluetooth driver information
Usage:        bt &lt;ifname&gt; features [-h] [le]
Where:        le - Selects LE features vs BR/EDR features
</code></pre><p>scan:</p><pre><code>Command:      scan
Description:  Bluetooth scan commands
Usage:        bt &lt;ifname&gt; scan [-h] &lt;start [-d]|get|stop&gt;
Where:        start - Starts scanning.  The -d option enables duplicate
              filtering.
              get   - Shows new accumulated scan results
              stop  - Stops scanning
</code></pre><p>advertise:</p><pre><code>Command:      advertise
Description:  Bluetooth advertise commands
Usage:        bt &lt;ifname&gt; advertise [-h] &lt;start|stop&gt;
Where:        start - Starts advertising
              stop  - Stops advertising
</code></pre><p>security:</p><pre><code>Command:      security
Description:  Enable security (encryption) for a connection:
              If device is paired, key encryption will be enabled.  If
              the link is already encrypted with sufficiently strong
              key this command does nothing.

              If the device is not paired pairing will be initiated. If
              the device is paired and keys are too weak but input output
              capabilities allow for strong enough keys pairing will be
              initiated.

              This command may return error if required level of security
              is not possible to achieve due to local or remote device
              limitation (eg input output capabilities).
</code></pre><p>bt:</p><pre><code>Usage:        bt &lt;ifname&gt; security [-h] &lt;addr&gt; public|random &lt;level&gt;
Where:        &lt;addr&gt;  - The 6-byte address of the connected peer
              &lt;level&gt; - Security level, on of:

                low     - No encryption and no authentication
                medium  - Encryption and no authentication (no MITM)
                high    - Encryption and authentication (MITM)
                fips    - Authenticated LE secure connections and encryption
</code></pre><p>gatt:</p><pre><code>Command:      gatt
Description:  Generic Attribute (GATT) commands
Usage:        bt &lt;ifname&gt; gatt [-h] &lt;cmd&gt; [option [option [option...]]]
Where:        See &quot;GATT Commands&quot; below
</code></pre><h2 id="gatt-commands" tabindex="-1">GATT Commands <a class="header-anchor" href="#gatt-commands" aria-label="Permalink to &quot;GATT Commands&quot;">​</a></h2><p>exchange-mtu:</p><pre><code>Command:      exchange-mtu
Description:  Set MTU to out maximum and negotiate MTU with peer
Usage:        bt &lt;ifname&gt; gatt exchange-mtu [-h] &lt;addr&gt; public|random
</code></pre><p>mget:</p><pre><code>Command:      mget
Description:  Get the pass/fail result of the last GATT &#39;exchange-mtu&#39; command
Usage:        bt &lt;ifname&gt; gatt mget [-h]
</code></pre><p>discover:</p><pre><code>Command:      discover
Description:  Initiate discovery
Usage:        bt &lt;ifname&gt; gatt discover [-h] &lt;addr&gt; public|random &lt;uuid16&gt; [&lt;start&gt; [&lt;end&gt;]]
</code></pre><p>characteristic:</p><pre><code>Command:      characteristic
Description:  Initiate characteristics discovery
Usage:        bt &lt;ifname&gt; gatt characteristic [-h] &lt;addr&gt; public|random [&lt;start&gt; [&lt;end&gt;]]
</code></pre><p>descriptor:</p><pre><code>Command:      descriptor
Description:  Initiate characteristics discovery
Usage:        bt &lt;ifname&gt; gatt descriptor [-h] &lt;addr&gt; public|random [&lt;start&gt; [&lt;end&gt;]]
</code></pre><p>dget:</p><pre><code>Command:      dget
Description:  Get the result of the last discovery action
Usage:        bt &lt;ifname&gt; gatt dget [-h]
</code></pre><p>read:</p><pre><code>Command:      read
Description:  Initiate a GATT read operation.
Usage:        bt &lt;ifname&gt; gatt read [-h] &lt;addr&gt; public|random &lt;handle&gt; [&lt;offset&gt;]
</code></pre><p>read-multiple:</p><pre><code>Command:      read-multiple
Description:  Initiate a GATT read-multiple operation.
Usage:        bt &lt;ifname&gt; gatt read-multiple [-h] &lt;addr&gt; public|random &lt;handle&gt; [&lt;handle&gt; [&lt;handle&gt;]..]
</code></pre><p>rget:</p><pre><code>Command:      rget
Description:  Get the data resulting from the last read operation
Usage:        bt &lt;ifname&gt; gatt rget [-h]
</code></pre><p>write:</p><pre><code>Command:      write
Description:  Initiate a GATT write operation.
Usage:        bt &lt;ifname&gt; gatt write [-h] &lt;addr&gt; public|random &lt;handle&gt; &lt;byte&gt; [&lt;byte&gt; [&lt;byte&gt;]..]
</code></pre><p>wget:</p><pre><code>Command:      wget
Description:  Get the pass/fail result of the last GATT &#39;write&#39; command
Usage:        bt &lt;ifname&gt; gatt wget [-h]
</code></pre>`,41)]))}const h=t(o,[["render",r]]);export{g as __pageData,h as default};
