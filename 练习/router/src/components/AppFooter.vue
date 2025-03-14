<template>
    <div class="footer-body">
        <div class="footer-group">
            <div class="footer-connected">
                <img class="footer-logo" :src="utils.getImage('logo.png')" alt="">
                <div class="footer-hint">Stay connected</div>
                <div class="connected-icons">
                    <img :src="utils.getImage('footer/ins.png')" alt="">
                    <img :src="utils.getImage('footer/youtube.png')" alt="">
                </div>

            </div>
            <div class="footer-item" v-for="(item, idx) in items" :key="idx">
                <div class="footer-item-title">{{ item.title }}</div>
                
                <ul>
                    <li v-for="(cell, idx) in item.cells" :key="idx"  @click="push(cell)">
                        <el-link :underline="false" @click="push(cell)">{{ cell.title }}</el-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="footer-bottom-msg">
                <div class="first-msg">Honeybee is a trade name of Apus Technology Inc. (Canda) and Apex Markets Inc.
                    (Canada)</div>
                <div>
                    Apus Technology Inc. is a FINCEN registered money service business with MSB Registration Number
                    M23125877. </div>
                <div>Apex Markets Inc. is a FINCEN registered money service business with MSB Registration Number
                    C100000431.</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="FooterView">
import { useRouter } from 'vue-router';

const router = useRouter()

interface FooterCell {
    title: string;
    path?: string;
    heavy?: boolean;
}

interface FooterItem {
    title: string;
    cells: FooterCell[];
}

const items = [
    {
        title: 'Company',
        cells: [
            { title: 'About Us'},
            { title: 'Careers'},
            { title: 'Contact Us', path: '/contact', heavy: true },
        ]
    },
    {
        title: 'Products',
        cells: [
            { title: 'Multi-currency accounts & FX' },
            { title: 'Collection & payout' },
            { title: 'Stablecoin' },
            { title: 'Crypto OTC', path: '/otc' },
            { title: 'Projects' },
        ]
    },
    {
        title: 'Use cases',
        cells: [
            { title: 'Global corporate treasury management' },
            { title: 'Import & Export companies' },
            { title: 'e-Commerce business' },
            { title: 'Consulting business' },
            { title: 'VC & Investment Fund' },
            { title: 'Crypto-native'},
        ]
    },
    {
        title: 'Resources',
        cells: [
            { title: 'News' },
            { title: 'Blog' },
            { title: 'Legal and Compliance', path: '/legal', heavy: true },
        ]
    },
]

function push(item: FooterCell) {
    let path = (item as FooterCell).path    
    if (path) {
        router.push(path)
    }
}

</script>

<style scoped lang="scss">
.footer-body {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 4rem 0 4rem 0;
    margin-top: 2rem;

    max-width: 1280px;
    margin: 0 auto;
}

.footer-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    background-color: #fff;
    gap: 1rem;

    .footer-connected {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 1rem;

        .footer-logo {
            width: 80%;
            object-fit: cover;
        }

        .footer-hint {
            font-weight: bold;
        }

        .connected-icons {
            display: flex;
            gap: 10px;

            img {
                width: 45px;
            }
        }
    }

    .footer-item-title {
        font-weight: bold;
        margin-bottom: 1rem;
    }

    ul {
        padding-left: 1rem;
        list-style-type: disc;

        .footer-cell-heavy {
            font-weight: bold;
        }
    }
}

.footer-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;

    div {
        font-size: 0.8rem;
    }

    .first-msg {
        padding-bottom: 1rem;
    }
}
</style>