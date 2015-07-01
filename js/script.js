/*eslint-env browser*/
/*eslint no-multi-spaces:0, no-use-before-define:0, no-unused-vars:0, no-alert:0 */
/*global $, e*/

$(function () {
    'use strict';
    // set the index of the select element to match the default block generated
    var index  = $('#default-block').prop('index');
    var gBlock = $('#select-glyph-block');

    gBlock.prop('selectedIndex', index);

    // default block to display
    generateAndBind('2600', '26FF');

    // stop the window from scrolling after events from select and last custom input element
    $(document).on('blur', '#select-glyph-block,#input-to', function() {
        window.scrollTo(0, 0);
    });

    /* move fixed textarea and make backspace appear, for better view while in landscape */
    window.onscroll = function() {
      if(window.pageYOffset >= 60) {
        $('#user-glyphs').addClass('user-glyphs-min');
        $('#backspace').addClass('show-backspace');
      } else if (window.pageYOffset <= 30) {
        $('#user-glyphs').removeClass('user-glyphs-min');
        $('#backspace').removeClass('show-backspace');
      }
    };

    // generate based on selection
    gBlock.change(function(e) {
        var option = this.options[this.selectedIndex];

        var range;
        if(option.id === 'custom-block') {
            $('.row-custom-block').addClass('show-custom-block');
        } else {
            $('.row-custom-block').removeClass('show-custom-block');
            range = option.value.split('-');
            generateAndBind(range[0], range[1]);
        }
    });

    /* go click, process custom range, error if invalid range */
    $('#input-go').click(function (e) {
      var fRange = $('#input-from').val();
      var tRange = $('#input-to').val();

      if(parseInt(fRange, 16) >= parseInt(tRange, 16)) {
        alert('Please enter a valid range');
      } else {
        generateAndBind(fRange, tRange);
      }
    });

    /* select all when in focus, for easy copying */
    $('#user-glyphs').click(function () {
        this.setSelectionRange(0, 999);
    });

    /* backspace click */
    $('#backspace').click(function() {
      var inString = $('#user-glyphs').val();
      $('#user-glyphs').val(inString.substring(0, inString.length - 1));
    });

    /* e */
    $('#email').click(function () {
        var first = 'elfego', second = 'buendia', third = 'x', end = '@gmail.com', subject = '?Subject=Glyph';
        $(this).attr('href', 'mailto:' + first + '.' + second + '.' + third + end + subject);
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
