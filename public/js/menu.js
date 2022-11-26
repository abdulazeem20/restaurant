import { header } from './components/header.js'
import { menuSection } from './components/menuC.js'

$('body').prepend(header('menu'))

menuSection().insertAfter($('#showcase'))

// $('#back').on('click', function () {
//     $('#menu-section').remove();
//     menuSection().insertAfter($('#showcase'))
// });
