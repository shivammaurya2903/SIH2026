function debounce(callback, delay = 300) {
    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    };
}

function throttle(callback, delay = 300) {
    let waiting = false;

    return function (...args) {
        if (waiting) {
            return;
        }

        callback.apply(this, args);

        waiting = true;

        setTimeout(() => {
            waiting = false;
        }, delay);
    };
}

window.debounce = debounce;
window.throttle = throttle;