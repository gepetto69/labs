$(function () {
  ////Select all images
  //$('img').addClass('selected');

  ////Count the amount of images on the screen
  //console.log($('img').length);

  ////In the top menu, select the current page (i.e. lineup)
  //$('#templatemo_menu .current').addClass('selected');

  ////Select the header and footer div, using their id
  //$('#templatemo_header, #templatemo_footer').addClass('selected');
  //$('#templatemo_header').add('#templatemo_footer').addClass('selected');

  ////Select the image with alt="image 1"
  //$('img[alt="image 1"]').addClass('selected');

  ////Select any div which is an immediate child of the most outer div
  //$('div:first>div').addClass('selected');

  ////Select all the h1, h2, ..., h6
  //$(':header').addClass('selected');

  ////Select all artists in both tables
  //$('td:nth-child(2)').addClass('selected');
  ////notice that eq doesn't work

  ////Select all artists in te first table
  //$('table:first td:nth-child(2)').addClass('selected');

  ////Select the div that contains the artist images
  //$('ul.artists').parent().addClass('selected');

  ////Select the hour that 'Diana Ross' performs
  //$('td:contains(Diana Ross)').prev().addClass('selected');

  ////Select all the th except the first two
  //$('th:gt(1)').addClass('selected');
});