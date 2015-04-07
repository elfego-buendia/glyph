function makeTD(ch) {
    return '<td class="glyph">' + ch + '</td>';
}

function makeTR(data) {
    return '<tr>' + data + '</tr>';
}

function makeGlyphs(seqStart, seqStop) {
    var tableData = '';
    
    var startAsDec = parseInt(seqStart, 16);
    var stopAsDec  = parseInt(seqStop,  16);
    
    for(var i = startAsDec; i <= stopAsDec; i += 8) {
        var ttd = '';
        for(var j = 0; j < 8; j += 1) {
            ttd += makeTD(String.fromCharCode(i+j));
        }
        tableData += makeTR(ttd);
    }
    
    return tableData;
}

