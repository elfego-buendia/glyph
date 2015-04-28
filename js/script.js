// selected global
var selectedGlyph = null;

$(function () {
    // set the index of the select element to match the default block generated
    var index  = $('#default-block').prop('index');
    var gBlock = $('#gb-select');

    gBlock.prop('selectedIndex', index);

    // default block to display
    generateAndBind('2600', '26FF');

    // stop the window from scrolling after events from select and last custom input element
    $(document).on('blur', '#gb-select,#to', function() {
        window.scrollTo(0,0);
    });

    window.onscroll = function() {
      if(window.pageYOffset >= 60) {
        $('#user-glyphs').addClass('ug-min');
        $('#backspace').addClass('bs-show');
      } else if (window.pageYOffset <= 30)  {
        $('#user-glyphs').removeClass('ug-min');
        $('#backspace').removeClass('bs-show');
      }
    }

    // generate based on selection
    gBlock.change(function(e) {
        var option = this.options[this.selectedIndex];

        var range;
        if(option.id == 'customb') {
            $('.cb-row').addClass('cb-show');
        } else {
            $('.cb-row').removeClass('cb-show');
            range = option.value.split('-');
            generateAndBind(range[0], range[1]);
        }
    });

    $('#go').click(function (e) {
      var fRange = $('#from').val();
      var tRange = $('#to').val();

      if(parseInt(fRange, 16) >= parseInt(tRange, 16)) {
        alert('Please enter a valid range');
      } else {
        generateAndBind(fRange, tRange);
      }
    });

    $('#user-glyphs').click(function (e) {
        this.setSelectionRange(0,999);
    });

    $('#backspace').click(function(e) {
      var inString = $('#user-glyphs').val();
      $('#user-glyphs').val(inString.substring(0, inString.length - 1))
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
}
