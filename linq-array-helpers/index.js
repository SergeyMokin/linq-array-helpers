Array.prototype.select = function (selector) {
    return this.map(selector);
};

Array.prototype.selectMany = function (selector) {
    let arr = this.map(selector);
    return [].concat(...arr);
}

Array.prototype.orderBy = function (selector) {
    return this.sort((x, y) => selector(x) > selector(y));
}

Array.prototype.orderByDescending = function (selector) {
    return this.sort((x, y) => selector(x) < selector(y));
}

Array.prototype.where = function (predicate) {
    return this.filter(predicate);
}

Array.prototype.count = function (predicate) {
    let arr = this;
    if (predicate) {
        arr = this.where(predicate);
    }
    return arr.length;
}

Array.prototype.all = function (predicate) {
    for (let el of this) {
        if (!predicate(el)) {
            return false;
        }
    }
    return true;
}

Array.prototype.any = function (predicate) {
    for (let el of this) {
        if (predicate(el)) {
            return true;
        }
    }
    return false;
}

Array.prototype.append = function (el) {
    return [...this, el];
}

Array.prototype.prepend = function (el) {
    return [el, ...this];
}

Array.prototype.sum = function (selector) {
    let arr = this;
    if (selector) {
        arr = this.select(selector);
    }
    return arr.reduce((x, y) => x + y);
}

Array.prototype.average = function (selector) {
    let arr = this;
    if (selector) {
        arr = this.select(selector);
    }
    return arr.sum() / arr.length;
}

Array.prototype.isEmpty = function () {
    return !this.length;
}

Array.prototype.first = function (predicate) {
    let arr = this;
    if (predicate) {
        arr = arr.where(predicate);
    }
    if (arr.isEmpty()) {
        return undefined;
    }
    return arr[0];
}

Array.prototype.last = function (predicate) {
    let arr = this;
    if (predicate) {
        arr = arr.where(predicate);
    }
    if (arr.isEmpty()) {
        return undefined;
    }
    return arr[arr.length - 1];
}

Array.prototype.min = function (selector) {
    let arr = this;
    if (selector) {
        arr = arr.select(selector);
    }
    return Math.min(...arr);
}

Array.prototype.max = function (selector) {
    let arr = this;
    if (selector) {
        arr = arr.select(selector);
    }
    return Math.max(...arr);
}

Array.prototype.take = function (count) {
    return this.slice(0, count);
}

Array.prototype.skip = function (count) {
    return this.slice(count, this.length);
}

Array.prototype.distinct = function (predicate) {
    if (predicate) {
        return this.where(predicate);
    }
    return this.where((value, index) => this.indexOf(value) === index);
}

Array.prototype.join = function (innerArr, outerSelector, innerSelector, resultSelector) {
    let arr = [];
    for (let outer of this) {
        for (let inner of innerArr) {
            if (outerSelector(outer) === innerSelector(inner)) {
                arr.push(resultSelector(outer, inner));
            }
        }
    }
    return arr;
}

Array.prototype.groupBy = function (selector) {
    let uniqueKeys = this.select(selector).distinct();
    let arr = [];
    for (let key of uniqueKeys) {
        let res = { key: key, values: [] };
        for (let el of this) {
            if (selector(el) === key) {
                res.values.push(el);
            }
        }
        arr.push(res);
    }
    return arr;
}

Array.prototype.aggregate = function (seed, action) {
    let res = seed;
    for (let el of this) {
        res = action(res, el);
    }
    return res;
}

Array.prototype.union = function () {
    return this.concat(...arguments).distinct();
}

Array.prototype.sequenceEqual = function (innerArr) {
    return JSON.stringify(this) === JSON.stringify(innerArr);
}
