import{_ as t,c as n,al as r,o}from"./chunks/framework.NFAqBSgQ.js";const p=JSON.parse('{"title":"Thermal Framework","description":"","frontmatter":{},"headers":[],"relativePath":"en/components/drivers/thermal/index.md","filePath":"en/components/drivers/thermal/index.md"}'),a={name:"en/components/drivers/thermal/index.md"};function i(s,e,u,m,c,_){return o(),n("div",null,e[0]||(e[0]=[r(`<h1 id="thermal-framework" tabindex="-1">Thermal Framework <a class="header-anchor" href="#thermal-framework" aria-label="Permalink to &quot;Thermal Framework&quot;">​</a></h1><p>Thermal Framework is a subsystem in the kernel that provides interfaces for thermal management of devices. It is designed to monitor the temperature of various components and adjust their operating conditions to prevent overheating. The framework is responsible for controlling the cooling devices, such as fans and heatsinks, to maintain the temperature within safe limits. It provides a unified thermal management interface that can be used by different thermal drivers. The drivers can be implemented by hardware vendors to support their specific thermal management requirements.</p><h2 id="brief" tabindex="-1">Brief <a class="header-anchor" href="#brief" aria-label="Permalink to &quot;Brief&quot;">​</a></h2><ol><li></li></ol><pre><code>Support Zone, Cooling Device and Governor

:   -   \`Zone\`: Responsible for monitoring the temperature of the
        specified area, obtains the temperature through the
        temperature sensor, and the sensor driver returns the
        temperature through callback function.

    -   \`Cooling Device\`: A cooling device is a device that can
        reduce the temperature by using resources such as cpufreq,
        fan, etc. The cpufreq cooling device driver is preset to
        simplify CPU frequency modulation temperature control.

    -   

        \`Governor\`: For temperature control, you can use the preset or custom registered one, preset \\&quot;step\\_wise\\&quot; governor:

        :   -   When the temperature of the \\&quot;Zone\\&quot; reaches the
                temperature trip point, and the temperature change
                trend rises or stabilizes (\\&quot;step\\_wise\\&quot; obtains
                the value of the corresponding \\&quot;Zone\\&quot; every 20ms
                \\[\`CONFIG_THERMAL_DUMMY_POLLING_DELAY=200\`,
                \`CONFIG_USEC_PER_TICK=100\`\\]), the current
                temperature equals to OR greater than the last
                obtained temperature value), improve the state of
                the \\&quot;Cooling Device\\&quot; (trigger the cooling
                operation executed by the corresponding state,
                Through \`set_state\`).
            -   When the temperature of the zone is lower than the
                temperature trip point, and the temperature trend is
                steadily decreasing, the state of the \\&quot;Cooling
                Device\\&quot; is reduced.
</code></pre><ol start="2"><li></li></ol><pre><code>Support three types of temperatures trip points: \`THERMAL_NORMAL\`, \`THERMAL_HOT\` and \`THERMAL_CRITICAL\`

:   -   \`NORMAL\`: When the device temperature reaches temperature of
        this trip point, control needs to be started. If current
        temperature equals to the temperature obtained last time,
        the temperature control level(\\&quot;cooling state\\&quot;) is
        maintained. When it is greater than, \\&quot;cooling state\\&quot;
        increased.
    -   \`HOT\`: When the device temperature reaches this trip point,
        stricter temperature control (such as resource limiting) is
        required. If the current temperature is equals to OR greater
        than temperature obtained last time, the temperature control
        level is increased.
    -   \`CRITICAL\`: Shut down / restart the device.
</code></pre><ol start="3"><li>ProcFS node supported, used for debugging, and we can get the binding info between &quot;Zone&quot;, &quot;Cooling Decice&quot;, &quot;Trip&quot; and &quot;Governor&quot;, temperature value and cooling state; (for example, &quot;Zone Device&quot;(temperature sensor): <code>/proc/thermal/cpu_thermal</code>), and write 0 or 1 to turn off or on the &quot;Zone Device&quot;;</li></ol><h2 id="device-driver" tabindex="-1">Device Driver <a class="header-anchor" href="#device-driver" aria-label="Permalink to &quot;Device Driver&quot;">​</a></h2><ol><li></li></ol><pre><code>Cooling Device

:   Device providers should provide
    \`struct thermal_cooling_device_ops_s\` instance and private data
    (optional, for example, \`struct dummy_cooling_device_s\`). Please
    ref to drivers/thermal/thermal\\_dummy.c:

        static const struct thermal_cooling_device_ops_s g_dummy_fan0_ops =
        {
          .set_state     = dummy_cdev_set_state,
          .get_state     = dummy_cdev_get_state,
          .get_max_state = dummy_cdev_get_max_state,
        };

        static struct dummy_cooling_device_s g_dummy_fan0_data =
        {
          .cur_state = 0,
          .max_state = 16,
        };

        int thermal_dummy_init(void)
        {
          FAR struct thermal_cooling_device_s *cdev;
          FAR struct thermal_zone_device_s *zdev;
          ...

          /* Cooling Device */
          cdev = thermal_cooling_device_register(&quot;fan0&quot;, &amp;g_dummy_fan0_data,
                                                 &amp;g_dummy_fan0_ops);
          ...
        }
</code></pre><ol start="2"><li></li></ol><pre><code>Zone Device

:   

    The following instances need to be defined:

    :   -   \`struct thermal_zone_device_ops_s\`: Get temperature, set
            temperature window(optional)
        -   \`struct thermal_zone_params_s\`: Describe zone, governor
            and cooling-maps
        -   \`dummy_zone_device_s\` (private, optional): For
            temperature and trends

    For example, drivers/thermal/thermal\\_dummy.c:

        /* Zone Device */
        zdev = thermal_zone_device_register(&quot;cpu-thermal&quot;, &amp;g_dummy_zone,
                                            &amp;g_dummy_zone_ops, &amp;g_dummy_params);

        static const struct thermal_zone_device_ops_s g_dummy_zone_ops =
        {
          .get_temp  = dummy_zdev_get_temp,
          .set_trips = dummy_zdev_set_trips,
        };

        static struct dummy_zone_device_s g_dummy_zone =
        {
          .temperature = 45,
          .raising = true,
        };
</code></pre><ol start="3"><li></li></ol><pre><code>Testing / Debugging

:   -   Disable Zone Device: \`echo 0 &gt; /proc/thermal/cpu-thermal\`

    -   Get binding info:

            nsh&gt; cat /proc/thermal/cpu-thermal
            z:cpu-thermal t:77 t:1 h:16 l:0 c:fan0 s:7|7
            z:cpu-thermal t:77 t:1 h:3 l:3 c:cpufreq s:3|3
            z:cpu-thermal t:77 t:2 h:2 l:0 c:cpufreq s:3|2
</code></pre><h2 id="board-customization" tabindex="-1">Board Customization <a class="header-anchor" href="#board-customization" aria-label="Permalink to &quot;Board Customization&quot;">​</a></h2><p>The binding relationship between Trip, Cooling Device, Governor and Zone is shown in thermal_dummy.c. It is expected that the vendor adapter will provide the hardware related initial under <code>CONFIG_ARCH_BOARD_CUSTOM_DIR</code> for product customization, as described in the following comments and structures: :</p><pre><code>/* thermal-zones {
 *   &quot;cpu-thermal&quot; {
 *     polling-delay : CONFIG_THERMAL_DUMMY_POLLING_DELAY;
 *     passive-delay : CONFIG_THERMAL_DUMMY_PASSIVE_DELAY;
 *     governor      : &quot;step_wise&quot;;
 *
 *     trips {
 *       &quot;cpu_crit&quot;   { 90, 10, THERMAL_CRITICAL };
 *       &quot;cpu_alert1&quot; { 70, 10, THERMAL_HOT };
 *       &quot;cpu_alert0&quot; { 60, 10, THERMAL_NORMAL };
 *     };
 *
 *     cooling-maps {
 *       &quot;cpu_alert0&quot; {
 *         { &quot;cpu0&quot;, THERMAL_NO_LIMIT, 3 };
 *       };
 *       &quot;cpu_alert1&quot; {
 *         { &quot;cpu0&quot;, THERMAL_NO_LIMIT, 3 };
 *         { &quot;fan0&quot;, THERMAL_NO_LIMIT, THERMAL_NO_LIMIT };
 *       };
 *       &quot;cpu_crit&quot; {
 *         { NULL, THERMAL_NO_LIMIT, THERMAL_NO_LIMIT };
 *       };
 *     };
 *   };
 * };
 */

static const struct thermal_zone_trip_s g_dummy_trips[] =
{
  {.name = &quot;cpu_crit&quot;,   .temp = 90, .hyst = 10, .type = THERMAL_CRITICAL},
  {.name = &quot;cpu_alert1&quot;, .temp = 70, .hyst = 10, .type = THERMAL_NORMAL},
  {.name = &quot;cpu_alert0&quot;, .temp = 60, .hyst = 10, .type = THERMAL_NORMAL},
};

static const struct thermal_zone_map_s g_dummy_maps[] =
{
  {
    .trip_name = &quot;cpu_alert1&quot;,
    .cdev_name = &quot;cpufreq&quot;,
    .low    = 3,
    .high   = THERMAL_NO_LIMIT,
    .weight = 20
  },
  {
    .trip_name = &quot;cpu_alert1&quot;,
    .cdev_name = &quot;fan0&quot;,
    .low    = THERMAL_NO_LIMIT,
    .high   = THERMAL_NO_LIMIT,
    .weight = 20
  },
  {
    .trip_name = &quot;cpu_alert0&quot;,
    .cdev_name = &quot;cpufreq&quot;,
    .low    = THERMAL_NO_LIMIT,
    .high   = 2,
    .weight = 20
  },
};

static const struct thermal_zone_params_s g_dummy_params =
{
  .gov_name = &quot;step_wise&quot;,
  .polling_delay = CONFIG_THERMAL_DUMMY_POLLING_DELAY,
  .trips = g_dummy_trips,
  .num_trips = nitems(g_dummy_trips),
  .maps = g_dummy_maps,
  .num_maps = nitems(g_dummy_maps),
};
</code></pre>`,18)]))}const l=t(a,[["render",i]]);export{p as __pageData,l as default};
