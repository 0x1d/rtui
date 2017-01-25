import $ from 'jquery';

export default class DataBinding {

    inputChange(node, model = {}) {
        node.on('keyup', function() {
            model.value = this.value;
        });
        return model;
    }

    inputHandler() {
        return {
            set: function(target, prop, newValue) {
                if (prop == 'value' && target.id) {
                    target[prop] = newValue;
                    $('[data-bind="' + target.id + '"]').val(newValue);
                    return true;
                } else return false;

            },
            get: function(target, name) {
                return target[name];
            }
        };
    }

}