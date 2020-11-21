export default constructor => {
    let instance;
    return () => {
        if (!instance) {
            instance = new constructor();
        }
        return instance;
    }
}