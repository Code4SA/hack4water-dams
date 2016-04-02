var container = d3.select("#container")
var svg_element = container[0][0];

function display_overlay(dam_name, level) {
    var level = parseInt(level);
    /* edit display logic here */
    var suffix = 1;
    if (level < 25) {
        suffix = 1;
    } else if (level < 50) {
        suffix = 2;
    } else if (level < 75) {
        suffix = 3;
    } else {
        suffix = 4;
    }
    /* end edit */

    d3.select('.dam').style('display', 'none');
    var dam_id = '#' + dam_name + '-' + suffix;
    var node = container.select(dam_id).style('display', 'block');
    container.select('#' + dam_name + '-text').text(level + '%');
}

queue()
    .defer(d3.xml, 'dams.svg')
    .defer(d3.csv, 'data.csv')
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
