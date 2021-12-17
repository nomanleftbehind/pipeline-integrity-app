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

#[wasm_bindgen]
pub fn sum_flow(obj: &JsValue, key: &str) -> Option<f64> {
    utils::set_panic_hook();

    // We are doing checks here to confirm that `obj` is iteratble JavaScript object.
    // If it isn't we are returning Rust None type which correspons to JavaScript undefined.
    let iterator = match js_sys::try_iter(obj) {
        Ok(i) => match i.ok_or_else(|| "need to pass iterable JS values!") {
            Ok(i) => {
                log!("Passing through js_sys::IntoIter");
                i
            }
            Err(e) => {
                log!("ok_or_else error: {}", &e);
                return None;
            }
        },
        Err(e) => {
            log!("Object is not iterable {:?}", &e);
            return None;
        }
    };

    let key_as_js_value = JsValue::from_str(key);

    let mut sum = 0.0;

    for x in iterator {
        let value_as_js_value = match &x {
            Ok(v) => v,
            Err(e) => e,
        };

        let object_has_provided_key =
            match js_sys::Reflect::has(value_as_js_value, &key_as_js_value) {
                Ok(v) => v,
                Err(e) => {
                    log!("{:?}", &e);
                    return None;
                }
            };

        if object_has_provided_key {
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
            log!(
                "Object {:?} doesn't have key {:?}",
                &value_as_js_value,
                &key_as_js_value
            );
        }
    }
    Some(sum)
}
