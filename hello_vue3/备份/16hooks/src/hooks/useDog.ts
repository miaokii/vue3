import { reactive } from 'vue'
import axios from 'axios'

export default function (){

    let urls = reactive([
        'https://images.dog.ceo//breeds//beagle//n02088364_5123.jpg'
    ])
    
    async function addAImage() {
        try {
            let result = await axios.get('https://dog.ceo/api/breeds/image/random')
            urls.push(result.data.message)
        } catch (error) {
            console.log(error);
        }
    }

    return {urls, addAImage}
}
