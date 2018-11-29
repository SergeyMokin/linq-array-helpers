require('./linq-array-helpers');

class TestObject {
    constructor(id, name) {
        this.Name = name;
        this.Id = id;
    }
}

const TEST_1 = [new TestObject(2, "Petrov"),
new TestObject(4, "Liskov"),
new TestObject(3, "Huzmanditov"),
new TestObject(5, "Rakasovich"),
new TestObject(1, "Lich")];

const TEST_2 = [5, 3, 7, 6, 4, 1, 9, 8, 2];

test();

function test(){
    testSelect();
    testSelectMany();
    testOrderBy();
    testOrderByDescending();
    testWhere();
    testCount();
    testAll();
    testAny();
    testAppend();
    testPrepend();
    testSum();
    testAverage();
    testIsEmpty();
    testFirst();
    testLast();
    testMin();
    testMax();
    testTake();
    testSkip();
    testDistinct();
    testJoin();
    testGroupBy();
    testAggregate();
    testUnion();
    testSequenceEqual();
}

function printTestResult(testName, testResult) {
    let title = `${'-'.repeat(30)}!${testName}!${'-'.repeat(30)}`;
    console.log(title);
    console.log(testResult);
    console.log('-'.repeat(title.length));
}

function testSelect() {
    printTestResult("SELECT", TEST_1.select(x => x.Name));
}

function testSelectMany() {
    printTestResult("SELECT-MANY", [TEST_1, TEST_2].selectMany(x => x));
}

function testOrderBy() {
    printTestResult("ORDER-BY", TEST_1.orderBy(x => x.Id));
}

function testOrderByDescending() {
    printTestResult("ORDER-BY-DESCENDING", TEST_1.orderByDescending(x => x.Id));
}

function testWhere() {
    printTestResult("WHERE", TEST_1.where(x => x.Id > 3));
}

function testCount() {
    printTestResult("COUNT", TEST_1.count(x => x.Id > 3));
}

function testAll() {
    printTestResult("ALL", TEST_1.all(x => typeof (x) === typeof (new TestObject())));
}

function testAny() {
    printTestResult("ANY", TEST_1.any(x => x.Id === 3));
}

function testAppend() {
    printTestResult("APPEND", TEST_1.append(new TestObject(6, "from_test")));
}

function testPrepend() {
    printTestResult("PREPEND", TEST_1.prepend(new TestObject(6, "from_test")));
}

function testSum() {
    printTestResult("SUM", TEST_1.sum(x => x.Id));
}

function testAverage() {
    printTestResult("AVERAGE", TEST_1.average(x => x.Id));
}

function testIsEmpty() {
    printTestResult("IsEmpty", TEST_1.isEmpty());
}

function testFirst() {
    printTestResult("FIRST", TEST_1.first());
}

function testLast() {
    printTestResult("LAST", TEST_1.last());
}

function testMin() {
    printTestResult("MIN", TEST_1.min(x => x.Id));
}

function testMax() {
    printTestResult("MAX", TEST_1.max(x => x.Id));
}

function testTake() {
    printTestResult("TAKE", TEST_1.take(3));
}

function testSkip() {
    printTestResult("SKIP", TEST_1.skip(3));
}

function testDistinct() {
    printTestResult("DISTINCT", [...TEST_2, ...TEST_2].distinct());
}

function testJoin() {
    printTestResult("JOIN", TEST_1.join(TEST_2, x => x.Id, x => x, (x, y) => { return { outer: x, inner: y } }));
}

function testGroupBy() {
    printTestResult("GROUP-BY", TEST_1.append(new TestObject(1, "from_test")).groupBy(x => x.Id));
}

function testAggregate(){
    printTestResult("AGGREGATE", TEST_1.aggregate(1, (seed, el) => seed * el.Id));
}

function testUnion(){
    let test = [1, 2, 5, 10, 11, 12];
    printTestResult("UNION", TEST_2.union(test));
}

function testSequenceEqual(){
    let test = [5, 3, 7, 6, 4, 1, 9, 8, 2];
    printTestResult("SEQUENCE-EQUAL", TEST_2.sequenceEqual(test));
}