var container = d3.select("#container")
var svg_element = container[0][0];
var scen = '16'

function display_overlay(dam_name, level) {
    var level = parseInt(level);
    /* edit display logic here */
    var suffix = 1;
    if (level < 19) {
        suffix = 3;
    } else if (scen == '15') {
        suffix = 2;
    } else if (scen == '16') {
        suffix = 1;
    } else {
        suffix = 1;
    }
    /* end edit */

    var dam_id = '#' + dam_name + '-' + suffix;
    var node = container.select(dam_id).style('display', 'block');
    container.select('#' + dam_name + '-text').text(level + '%');
}

queue()
    .defer(d3.xml, 'dams.svg')
    .defer(d3.csv, 'data_wc.csv')
    .await(function(error, xml, csv) {
        // DON'T NEED TO EDIT ANYTHING HERE
        /* Insert graphic into html page */
        var importedNode = document.importNode(xml.documentElement, true);
        var img = svg_element.appendChild(importedNode.cloneNode(true));

        /* go through every csv element */
        for (idx in csv) {
            dam = csv[idx]
            display_overlay(dam.dam, dam.level)
        }
    })
