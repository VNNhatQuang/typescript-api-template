

class Random {

    /**
     * Hàm tại ngẫu nhiên n chữ số
     * @param numberOfDigits Số lượng chữ số cần tạo ngẫu nhiên
     * @returns 
     */
    public generateRandomNumber(numberOfDigits: number) {
        const min = Math.pow(10, numberOfDigits - 1);
        const max = Math.pow(10, numberOfDigits) - 1;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


}



export default new Random;
