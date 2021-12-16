mod utils;

use wasm_bindgen::prelude::*;

extern crate web_sys;

macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

// // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// // allocator.
// #[cfg(feature = "wee_alloc")]
// #[global_allocator]
// static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// #[wasm_bindgen]
// extern {
//     fn alert(s: &str);
// }

// #[wasm_bindgen]
// pub fn greet() {
//     alert("Hello, pipeline-database-wasm!");
// }

// #[no_mangle]
#[wasm_bindgen]
pub extern "C" fn add_one(x: i32, y: i32) -> i32 {
    utils::set_panic_hook();
    log!("x: {}, y: {}", x, y);
    x + y
}

// #[wasm_bindgen]
#[wasm_bindgen(catch)]
pub fn sum_flow(obj: &JsValue, key: &str) -> Result<f64, JsValue> {
    utils::set_panic_hook();

    let iterator = js_sys::try_iter(obj)?.ok_or_else(|| "need to pass iterable JS values!")?;
    let key_as_js_value = JsValue::from_str(key);

    let mut sum = 0.0;

    for x in iterator {
        let value_as_js_value = match &x {
            Ok(v) => v,
            Err(e) => e,
        };

        if js_sys::Reflect::has(value_as_js_value, &key_as_js_value)? {
            let value_as_result = js_sys::Reflect::get(value_as_js_value, &key_as_js_value);

            let value_as_js_value2 = match &value_as_result {
                Ok(v) => v,
                Err(e) => e,
            };
            let value = match value_as_js_value2.as_f64() {
                Some(x) => x,
                None => 0.0,
            };
            log!("obj: {:?}, key: {:?}, key_as_js_value: {:?}, value_as_result: {:?}, value_as_js_value: {:?}, value: {:?}", obj, key, key_as_js_value, value_as_result, value_as_js_value, value);
            sum += value;
            // ...
        } else {
            log!("object {:?} doesn't have key {:?}", &value_as_js_value, &key_as_js_value);
            //return Err(/*js_sys::Error::new("Object has no specified key").into()*/JsValue::from_str("Fucking message"));
        }
    }
    Ok(sum)
}

// pub extern "C" fn greet(a: &str) -> String {
//     format!("Hello, {}!", a)
// }

// #[export_name = "greet"]
// pub extern "C" fn __wasm_bindgen_generated_greet(
//     arg0_ptr: *const u8,
//     arg0_len: usize,
// ) -> *mut String {
//     let arg0 = unsafe {
//         let slice = ::std::slice::from_raw_parts(arg0_ptr, arg0_len);
//         ::std::str::from_utf8_unchecked(slice)
//     };
//     let _ret = greet(arg0);
//     Box::into_raw(Box::new(_ret))
// }
