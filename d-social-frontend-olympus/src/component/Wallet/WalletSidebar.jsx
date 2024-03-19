import Link from 'next/link'
import React from 'react'
import "@/component/ManageAds/style.css";

const sideBarItenmList = [
    {
        title: 'Wallet Dashboard',
        url: '/wallet',
        icon: (
            <span>
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.33333 9.7507L4.33333 9.75M9.33333 9.7507L7.25 7.5625M9.33333 9.7507L7.25 11.9375M16 8V7.3C16 6.31991 16 5.82986 15.8183 5.45552C15.6586 5.12623 15.4036 4.85851 15.09 4.69074C14.7335 4.5 14.2667 4.5 13.3333 4.5H1M16 8V11.5M16 8H14.3333C13.4128 8 12.6667 8.78348 12.6667 9.75C12.6667 10.7165 13.4128 11.5 14.3333 11.5H16M1 4.5V12.2C1 13.1801 1 13.6702 1.18166 14.0445C1.34144 14.3738 1.59641 14.6415 1.91002 14.8092C2.26653 15 2.73325 15 3.66667 15H13.3333C14.2667 15 14.7335 15 15.09 14.8092C15.4036 14.6415 15.6586 14.3738 15.8183 14.0445C16 13.6702 16 13.1801 16 12.2V11.5M1 4.5V3.8C1 2.81991 1 2.32986 1.18166 1.95552C1.34144 1.62623 1.59641 1.35851 1.91002 1.19074C2.26653 1 2.73324 1 3.66667 1H10.8333C11.7667 1 12.2335 1 12.59 1.19074C12.9036 1.35851 13.1586 1.62623 13.3183 1.95552C13.5 2.32986 13.5 2.81991 13.5 3.8V4.5" stroke="#307777" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </span>
        )
    },
    {
        title: 'Send Money',
        url: '/wallet',
        icon: (
            <span>
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.52075 10.8854C7.52075 11.6533 8.1145 12.2708 8.84284 12.2708H10.3312C10.9645 12.2708 11.4791 11.7325 11.4791 11.0596C11.4791 10.3392 11.1624 10.0779 10.6953 9.91168L8.31242 9.08043C7.84534 8.91418 7.52868 8.66084 7.52868 7.93251C7.52868 7.2675 8.04325 6.72125 8.67659 6.72125H10.1649C10.8933 6.72125 11.487 7.33875 11.487 8.10668" stroke="#393333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M9.5 5.9375V13.0625" stroke="#393333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M17.4166 9.50001C17.4166 13.87 13.8699 17.4167 9.49992 17.4167C5.12992 17.4167 1.58325 13.87 1.58325 9.50001C1.58325 5.13001 5.12992 1.58334 9.49992 1.58334" stroke="#393333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M17.4167 4.75003L17.4167 1.58336L14.2501 1.58336" stroke="#393333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M13.4584 5.54169L17.4167 1.58335" stroke="#393333" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

            </span>
        )
    },
    {
        title: 'Payments Setting',
        url: '/wallet/payment-settings',
        icon: (
            <span>
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.641 2.04028H0.998873C0.448096 2.04028 0 2.48838 0 3.03916V13.2405C0 13.7913 0.448096 14.2394 0.998873 14.2394H11.8803C12.0564 14.2394 12.1991 14.0966 12.1991 13.9206C12.1991 13.7445 12.0564 13.6017 11.8803 13.6017H0.998873C0.799633 13.6017 0.637576 13.4397 0.637576 13.2404V3.03916C0.637576 2.83992 0.799633 2.67786 0.998873 2.67786H16.641C16.8402 2.67786 17.0023 2.83992 17.0023 3.03916V7.45981C17.0023 7.63586 17.145 7.77862 17.3211 7.77862C17.4971 7.77862 17.6399 7.63589 17.6399 7.45981V3.03916C17.6398 2.48838 17.1917 2.04028 16.641 2.04028Z" fill="black" />
                    <path d="M5.41946 4.42059H2.69912C2.33582 4.42059 2.04028 4.71613 2.04028 5.07943V7.11971C2.04028 7.48301 2.33582 7.77855 2.69912 7.77855H5.4195C5.7828 7.77855 6.07834 7.48301 6.07834 7.11971V5.07943C6.0783 4.71613 5.78276 4.42059 5.41946 4.42059ZM3.40045 7.14097H2.69912C2.6874 7.14097 2.67786 7.13143 2.67786 7.11971V5.07943C2.67786 5.06771 2.6874 5.05817 2.69912 5.05817H3.40045V7.14097ZM5.44073 7.11971C5.44073 7.13143 5.43119 7.14097 5.41946 7.14097H4.03803V6.41838H4.39933C4.57537 6.41838 4.71813 6.27565 4.71813 6.09957C4.71813 5.92349 4.57541 5.78076 4.39933 5.78076H4.03803V5.05817H5.41946C5.43119 5.05817 5.44073 5.06771 5.44073 5.07943V7.11971Z" fill="black" />
                    <path d="M13.7506 4.08054C13.3741 4.08054 13.0238 4.1939 12.7313 4.38791C12.4303 4.18838 12.0757 4.08054 11.7103 4.08054C10.6908 4.08054 9.86133 4.91 9.86133 5.92955C9.86133 6.94909 10.6908 7.77856 11.7103 7.77856C12.0869 7.77856 12.4374 7.66512 12.73 7.471C13.0311 7.67035 13.3861 7.77856 13.7506 7.77856C14.7702 7.77856 15.5996 6.94909 15.5996 5.92955C15.5996 4.91 14.7702 4.08054 13.7506 4.08054ZM12.2525 7.01236C12.0892 7.09445 11.9052 7.14095 11.7103 7.14095C11.0424 7.14095 10.4989 6.59752 10.4989 5.92955C10.4989 5.26158 11.0424 4.71815 11.7103 4.71815C11.9005 4.71815 12.086 4.76294 12.2532 4.84677C12.0323 5.15136 11.9016 5.52539 11.9016 5.92955C11.9016 6.32261 12.0267 6.70009 12.2525 7.01236ZM13.7506 7.14095C13.5608 7.14095 13.3751 7.09604 13.2078 7.01225C13.4287 6.70766 13.5594 6.33371 13.5594 5.92955C13.5594 5.7535 13.4166 5.61074 13.2405 5.61074C13.0645 5.61074 12.9217 5.75346 12.9217 5.92955C12.9217 6.16961 12.8513 6.39345 12.7303 6.58189C12.6069 6.38907 12.5392 6.16356 12.5392 5.92955C12.5392 5.26158 13.0826 4.71815 13.7506 4.71815C14.4185 4.71815 14.962 5.26158 14.962 5.92955C14.962 6.59752 14.4186 7.14095 13.7506 7.14095Z" fill="black" />
                    <path d="M5.07947 9.52127H2.35909C2.18304 9.52127 2.04028 9.66399 2.04028 9.84008C2.04028 10.0161 2.18301 10.1589 2.35909 10.1589H5.07943C5.25548 10.1589 5.39824 10.0162 5.39824 9.84008C5.39827 9.66399 5.25551 9.52127 5.07947 9.52127Z" fill="black" />
                    <path d="M12.2204 11.5615H2.35909C2.18304 11.5615 2.04028 11.7042 2.04028 11.8803C2.04028 12.0564 2.18301 12.1991 2.35909 12.1991H12.2204C12.3964 12.1991 12.5392 12.0564 12.5392 11.8803C12.5392 11.7042 12.3965 11.5615 12.2204 11.5615Z" fill="black" />
                    <path d="M9.16003 9.52127H6.43966C6.26361 9.52127 6.12085 9.66399 6.12085 9.84008C6.12085 10.0161 6.26357 10.1589 6.43966 10.1589H9.16C9.33604 10.1589 9.4788 10.0162 9.4788 9.84008C9.4788 9.66399 9.33608 9.52127 9.16003 9.52127Z" fill="black" />
                    <path d="M12.5605 9.52127H10.5202C10.3442 9.52127 10.2014 9.66399 10.2014 9.84008C10.2014 10.0161 10.3441 10.1589 10.5202 10.1589H12.5605C12.7365 10.1589 12.8793 10.0162 12.8793 9.84008C12.8793 9.66399 12.7365 9.52127 12.5605 9.52127Z" fill="black" />
                    <path d="M18.3198 11.954V10.5201C18.3198 9.21935 17.2616 8.1611 15.9608 8.1611C14.66 8.1611 13.6017 9.21935 13.6017 10.5201V11.954C13.2069 12.0874 12.9216 12.4611 12.9216 12.9005V15.9609C12.9216 16.5116 13.3697 16.9597 13.9205 16.9597H18.0011C18.5518 16.9597 18.9999 16.5116 18.9999 15.9609V12.9005C18.9999 12.4611 18.7147 12.0874 18.3198 11.954ZM14.2393 10.5201C14.2393 9.57092 15.0116 8.79868 15.9608 8.79868C16.91 8.79868 17.6822 9.57092 17.6822 10.5201V11.9016H14.2393L14.2393 10.5201ZM18.3623 15.9609C18.3623 16.1601 18.2003 16.3222 18.0011 16.3222H13.9205C13.7213 16.3222 13.5592 16.1601 13.5592 15.9609V12.9005C13.5592 12.7012 13.7213 12.5392 13.9205 12.5392H18.0011C18.2003 12.5392 18.3623 12.7012 18.3623 12.9005V15.9609Z" fill="black" />
                    <path d="M15.961 13.2617C15.504 13.2617 15.1321 13.6336 15.1321 14.0906C15.1321 14.4347 15.3429 14.7304 15.6421 14.8556V15.2808C15.6421 15.4568 15.7849 15.5996 15.961 15.5996C16.137 15.5996 16.2798 15.4569 16.2798 15.2808V14.8556C16.579 14.7304 16.7898 14.4347 16.7898 14.0906C16.7898 13.6336 16.418 13.2617 15.961 13.2617ZM15.961 14.2819C15.8555 14.2819 15.7697 14.1961 15.7697 14.0906C15.7697 13.9852 15.8555 13.8994 15.961 13.8994C16.0664 13.8994 16.1522 13.9852 16.1522 14.0906C16.1522 14.1961 16.0664 14.2819 15.961 14.2819Z" fill="black" />
                </svg>

            </span>
        )
    },
    {
        title: 'Billing',
        url: '/wallet',
        icon: (
            <span>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1915_4690)">
                        <path d="M9.91677 6.23334C9.24567 6.23334 8.62593 6.44275 8.11872 6.80002H4.81677C4.64677 6.80002 4.53345 6.91334 4.53345 7.08334C4.53345 7.25334 4.64677 7.36666 4.81677 7.36666H7.50785C7.23811 7.69444 7.03434 8.07883 6.91627 8.49998H4.81677C4.64677 8.49998 4.53345 8.6133 4.53345 8.7833C4.53345 8.9533 4.64677 9.06663 4.81677 9.06663H6.81291C6.80461 9.15993 6.80012 9.25439 6.80012 9.34995C6.80012 9.64492 6.84063 9.92997 6.9163 10.1999H4.8168C4.6468 10.1999 4.53348 10.3133 4.53348 10.4833C4.53348 10.6533 4.6468 10.7666 4.8168 10.7666H7.13717C7.65086 11.7778 8.69948 12.4666 9.9168 12.4666C11.6451 12.4666 13.0335 11.0783 13.0335 9.34992C13.0334 7.62169 11.6451 6.23334 9.91677 6.23334ZM9.91677 11.9C8.50009 11.9 7.36677 10.7667 7.36677 9.35002C7.36677 9.18775 7.38231 9.02947 7.41076 8.87591C7.41591 8.85811 7.41946 8.83928 7.42146 8.81956C7.54756 8.21507 7.8854 7.69208 8.35489 7.3297C8.37737 7.31712 8.39826 7.30161 8.41685 7.28332C8.8368 6.97918 9.35428 6.80002 9.91677 6.80002C11.3334 6.80002 12.4668 7.93334 12.4668 9.35002C12.4668 10.7667 11.3334 11.9 9.91677 11.9Z" fill="black" />
                        <path d="M11.4749 7.96166C11.3332 7.87666 11.1632 7.90499 11.0782 8.04666L9.57654 10.3133L8.69822 9.43502C8.5849 9.3217 8.4149 9.3217 8.30154 9.43502C8.18822 9.54834 8.18822 9.71834 8.30154 9.8317L9.43487 10.965C9.49154 11.0217 9.54819 11.05 9.63319 11.05C9.74651 11.05 9.83151 10.9933 9.85987 10.9083L11.5599 8.35834C11.6449 8.21666 11.6166 8.04666 11.4749 7.96166Z" fill="black" />
                        <path d="M15.3 0H4.25C3.45668 0 2.83332 0.623322 2.83332 1.41668V13.0334H0.85C0.368322 13.0334 0 13.4017 0 13.8834V15.3C0 16.235 0.765 17 1.7 17H12.2967H12.4667C12.8917 17 13.2884 16.83 13.6 16.5467C13.9683 16.235 14.1667 15.7817 14.1667 15.3V3.96668H16.15C16.6317 3.96668 17 3.59836 17 3.11668V1.7C17 0.765 16.235 0 15.3 0ZM1.7 16.4333C1.07668 16.4333 0.566678 15.9233 0.566678 15.3V13.8833C0.566678 13.7416 0.68 13.6 0.85 13.6H3.11668H10.7667V15.2433V15.3C10.7667 15.725 10.9084 16.1217 11.1917 16.4333H1.7ZM13.6 1.7V15.3C13.6 15.64 13.4583 15.9233 13.2317 16.15C13.0184 16.3158 12.7656 16.4219 12.5062 16.4357C12.4934 16.4343 12.4803 16.4334 12.4667 16.4334C12.2745 16.4334 12.0932 16.3847 11.9343 16.2995C11.5789 16.099 11.3334 15.702 11.3334 15.2434V13.3167C11.3334 13.1467 11.22 13.0334 11.05 13.0334H3.4V1.41668C3.4 0.935 3.76832 0.566678 4.25 0.566678H14.025C13.9704 0.63335 13.9201 0.704105 13.8742 0.777982C13.7149 1.02292 13.6167 1.31069 13.6021 1.61955C13.6007 1.64624 13.6 1.67307 13.6 1.7ZM16.4333 3.11668C16.4333 3.25836 16.32 3.4 16.15 3.4H14.1667V1.7C14.1667 1.07668 14.6767 0.566678 15.3 0.566678C15.9233 0.566678 16.4333 1.07668 16.4333 1.7V3.11668Z" fill="black" />
                        <path d="M6.79992 2.26669H10.1999C10.3699 2.26669 10.4832 2.15337 10.4832 1.98337C10.4832 1.81337 10.3699 1.70001 10.1999 1.70001H6.79992C6.62992 1.70001 6.5166 1.81333 6.5166 1.98333C6.5166 2.15333 6.62992 2.26669 6.79992 2.26669Z" fill="black" />
                        <path d="M4.81677 3.96667H12.1834C12.3534 3.96667 12.4668 3.85335 12.4668 3.68335C12.4668 3.51335 12.3534 3.40002 12.1834 3.40002H4.81677C4.64677 3.40002 4.53345 3.51335 4.53345 3.68335C4.53345 3.85335 4.64677 3.96667 4.81677 3.96667Z" fill="black" />
                        <path d="M4.81677 5.66668H12.1834C12.3534 5.66668 12.4668 5.55336 12.4668 5.38336C12.4668 5.21336 12.3534 5.10004 12.1834 5.10004H4.81677C4.64677 5.10004 4.53345 5.21336 4.53345 5.38336C4.53345 5.55336 4.64677 5.66668 4.81677 5.66668Z" fill="black" />
                    </g>
                    <defs>
                        <clipPath id="clip0_1915_4690">
                            <rect width="17" height="17" fill="white" />
                        </clipPath>
                    </defs>
                </svg>

            </span>
        )
    },
    {
        title: 'Withdraw',
        url: '/wallet',
        icon: (
            <span>
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1915_4702)">
                        <path d="M13.0094 12.1014V12.7023C13.5066 12.7023 13.911 12.298 13.911 11.8007V10.6787C13.911 10.1813 13.5066 9.77695 13.0094 9.77695H3.4719C2.97469 9.77695 2.57031 10.1813 2.57031 10.6787V11.8007C2.57031 12.298 2.97469 12.7023 3.4719 12.7023V12.1014C3.30621 12.1014 3.17137 11.9664 3.17137 11.8007V10.6787C3.17137 10.513 3.30621 10.3781 3.4719 10.3781H13.0093C13.175 10.3781 13.3098 10.513 13.3098 10.6787V11.8007C13.3098 11.9664 13.1751 12.1014 13.0094 12.1014Z" fill="black" />
                        <path d="M14.3516 0.5H1.64853C1.08512 0.5 0.626709 0.958412 0.626709 1.52182V14.225C0.626709 14.7884 1.08512 15.2468 1.64853 15.2468H3.44185V14.7256V14.5338V14.4053H1.64853C1.54904 14.4053 1.46811 14.3243 1.46811 14.225V1.52195C1.46811 1.42246 1.54904 1.34153 1.64853 1.34153H14.3517C14.4512 1.34153 14.5322 1.42246 14.5322 1.52195V14.2252C14.5322 14.3246 14.4512 14.4055 14.3517 14.4055H13.0394V14.5341V14.7259V15.247H14.3517C14.9151 15.247 15.3735 14.7886 15.3735 14.2252V1.52195C15.3735 0.95854 14.915 0.5 14.3516 0.5Z" fill="black" />
                        <path d="M11.5668 2.664H2.46997V8.07391H11.5668V2.664Z" fill="black" />
                        <path d="M13.6102 2.664H12.1675V4.10659H13.6102V2.664Z" fill="black" />
                        <path d="M13.6102 4.64761H12.1675V6.0902H13.6102V4.64761Z" fill="black" />
                        <path d="M13.6102 6.6312H12.1675V8.07379H13.6102V6.6312Z" fill="black" />
                        <path d="M3.68213 14.6958H12.7988V11.039H3.68213V14.6958ZM4.19266 11.931C4.52648 11.8775 4.79359 11.6841 4.88719 11.4333H11.662C11.749 11.6668 11.9869 11.8502 12.2889 11.9177V13.817C11.9872 13.8844 11.7493 14.0677 11.662 14.301H4.88732C4.79371 14.0502 4.52661 13.8561 4.19266 13.8028V11.931Z" fill="black" />
                        <path d="M8.2404 14.1104C8.93557 14.1104 9.49912 13.5538 9.49912 12.8673C9.49912 12.1807 8.93557 11.6242 8.2404 11.6242C7.54523 11.6242 6.98169 12.1807 6.98169 12.8673C6.98169 13.5538 7.54523 14.1104 8.2404 14.1104Z" fill="black" />
                        <path d="M11.6617 15.187H4.88719C4.85992 15.1139 4.81625 15.0464 4.76209 14.9849H3.68213V15.5816H12.7988V14.9849H11.7873C11.7328 15.0463 11.6892 15.1137 11.6617 15.187Z" fill="black" />
                        <path d="M11.6617 16.1055H4.88719C4.85992 16.0324 4.81625 15.9648 4.76209 15.9033H3.68213V16.5H12.7988V15.9033H11.7873C11.7328 15.9645 11.6892 16.0324 11.6617 16.1055Z" fill="black" />
                    </g>
                    <defs>
                        <clipPath id="clip0_1915_4702">
                            <rect width="16" height="16" fill="white" transform="translate(0 0.5)" />
                        </clipPath>
                    </defs>
                </svg>
            </span>
        )
    },
    {
        title: 'Transection History',
        url: '/wallet',
        icon: (
            <span>
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.02062 4.01289C7.02527 1.01249 11.9096 1.04439 14.9326 4.06741C17.9569 7.09173 17.9875 11.9789 14.9832 14.9832C11.9789 17.9875 7.09169 17.9569 4.06738 14.9326C2.27516 13.1404 1.53507 10.6953 1.85287 8.37678C1.8974 8.05188 2.19687 7.82465 2.52175 7.86918C2.84663 7.91371 3.0739 8.21315 3.02938 8.53805C2.76022 10.5016 3.38661 12.5725 4.90707 14.0929C7.47561 16.6615 11.6109 16.6761 14.1435 14.1435C16.6761 11.6109 16.6614 7.47565 14.0929 4.9071C11.5256 2.33986 7.39329 2.32385 4.86032 4.85258L5.45225 4.85555C5.78016 4.8572 6.04465 5.12436 6.043 5.45228C6.04136 5.7802 5.77419 6.04468 5.44628 6.04304L3.43105 6.03291C3.10546 6.03127 2.84193 5.76774 2.84029 5.44215L2.83017 3.42692C2.82851 3.09901 3.09301 2.83185 3.42093 2.83019C3.74884 2.82855 4.01601 3.09304 4.01765 3.42096L4.02062 4.01289ZM9.49992 5.73952C9.82783 5.73952 10.0937 6.00535 10.0937 6.33327V9.25403L11.8989 11.0593C12.1308 11.2911 12.1308 11.6671 11.8989 11.8989C11.667 12.1308 11.2911 12.1308 11.0593 11.8989L8.90617 9.74589V6.33327C8.90617 6.00535 9.17201 5.73952 9.49992 5.73952Z" fill="#1C274C" />
                </svg>
            </span>
        )
    },
]
export default function WalletSidebar() {
    return (
        <div>
            <div className="ui-block px-2 ">
                <div className="ui-block-title text-left ">
                    <h6 className='text-left'>Wallet</h6>
                </div>

                <div className="ui-block-content">
                    {
                        sideBarItenmList.map(item => (
                            <Link href={item.url}>
                                <div className="d-flex align-items-center">
                                    {item.icon}
                                    <p
                                        tabIndex="0"
                                        className="ads-sidebar-btn"

                                    >
                                        {item.title}
                                    </p>
                                </div>
                            </Link>
                        ))
                    }



                </div>
            </div>
        </div>
    )
}