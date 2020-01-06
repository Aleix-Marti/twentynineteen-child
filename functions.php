<?php
add_action( 'wp_enqueue_scripts', 'amc_enqueue_resources' );
function amc_enqueue_resources() {
 
    $parent_style = 'parent-style'; // This is 'twentynineteen-style' for the Twenty Twenty theme.
 
    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( $parent_style ),
        wp_get_theme()->get('Version')
    );

    wp_enqueue_script( 'main-script', get_stylesheet_directory_uri() . '/js/script.js', array(), '1.0.0', true );
}

/**
 * Añadir al menú el theme switcher para poder cambiar del theme claro al theme oscuro.
 * Se engancha al menu de social links (class= "social-links-menu")
 * Si se quiere enganchar al menú principal, se puede hacer cambiando la classe "social-links-menu" por "main-menu"
 * Para saber qué clase tiene el menú, se puede descomentar la línea del var_dump par ver a qué clases se puede enganchar
 * Hay que cambiar la clase del menú para engancharlo a otro menú.
 */

 add_filter('wp_nav_menu_items', 'amc_theme_switcher_menu', 10, 2);

function amc_theme_switcher_menu($items, $args) {
    // var_dump($args);
    // if ( $args->menu_class == "main-menu") {
    if ( $args->menu_class == "social-links-menu") {
        $items.='<li><div class="switch-group">
                    <label for="light" class="label-light"></label>
                    <div class="switch-container">
                        <input class="switch switch--left" type="radio" name="switcher" id="light" value="light">
                        <input class="switch switch--right" type="radio" name="switcher" id="dark" value="dark">
                        <span class="status"></span>
                    </div>
                    <label for="dark" class="label-dark"></label>   
                </div></li>';
    }
    return $items;
}