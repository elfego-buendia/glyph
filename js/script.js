// selected global
var selectedGlyph = null;

$(function () {
    // set the index of the select element to match the default block generated
    var index  = $('#default-block').prop('index');
    var gBlock = $('#glyph-block');
    
    gBlock.prop('selectedIndex', index);
    
    // default block to display
    generateAndBind('2600', '26FF');
    
    // generate based on selection
    gBlock.change(function() {
        var option = this.options[this.selectedIndex];
        
        var range;
        if(option.id == 'customb') {
            range = ['2630', '2637'];
        } else {
            range = option.value.split('-');
        }

        generateAndBind(range[0], range[1]);
    });
    
    $('#user-glyphs').click(function (e) {
        this.setSelectionRange(0,999);
    });
});

function generateAndBind(from, to) {
    var gen1 = makeGlyphs(from, to);
    $('.generated').html(gen1);
    
    var glyph      = $('.glyph');
    var userGlyphs = $('#user-glyphs');
    
    glyph.hammer().bind('tap', function(e) {
        // triggers reflow which allows CSS animation to retrigger
        $(this).removeClass('selected');
        this.offsetWidth = this.offsetWidth;
        $(this).addClass('selected');
        
        userGlyphs.val(userGlyphs.val() + $(this).text());
    });
    glyph.hammer().bind('press', function (e) {
        if (selectedGlyph === null) {
            selectedGlyph = this;
            $(this).toggleClass('magnified');
        } else {
            $(selectedGlyph).toggleClass('magnified');
            selectedGlyph = this;
            $(this).toggleClass('magnified');
        }
    });
    glyph.hammer().bind('swipe', function (e) {
       $(this).removeClass('magnified'); 
       selectedGlyph = null;
    });
}