$(function () {
  var unitPrices = [60, 35, 35, 5];
  var shirts = ['images/t-marvin.jpg', 'images/t-stevie.jpg', 'images/t-commodores.jpg'];
  var shirtIndex = 0;

  function calculatePrices() {
    var total = 0;
    $('tbody tr:not(:last)').each(function (index) {
      var this$ = $(this);

      var rowprice = unitPrices[index] * this$.find('input[type="number"]').val();
      this$.find('span').text('$' + rowprice);
      total += rowprice;
    });

    $('tr:last span').text('$' + total);
  }

  function bindEvents() {
    $('form table :checkbox').on('click.lock', function () {
      var this$ = $(this);

      var checked = this$.prop('checked');
      this$.closest('tr').find('input[type="number"], span')
           .toggle(checked)
           .filter('input').val(0);
      calculatePrices();
    });

    $('form table input[type="number"]').on('keyup.lock change.lock', function () {
      calculatePrices();
    });
  }

  bindEvents();

  $('#lock').click(function (e) {
    var checked = $(this).prop('checked');

    if (checked) {
      $('*').off('.lock');
      $('table input').prop('disabled', true);
    }
    else {
      bindEvents();
      $('table input').prop('disabled', false);
    }
  });

  $('#shirt a, #shirt img').click(function (e) {
    shirtIndex = (shirtIndex + 1) % shirts.length;
    $('#shirt img').attr('src', shirts[shirtIndex]);

    e.preventDefault();
  });

  $('#shirt img').hover(function () {
    $(this).fadeTo('fast', 0.4);
  }, function () {
    $(this).fadeTo('fast', 1);
  });

});