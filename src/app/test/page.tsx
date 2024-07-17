import StepTitle from '@/ui/atoms/stepTitle/StepTitle';
import Design from '@/ui/templates/design/Design';

export default function TestPage() {
  return (
    <div className=" min-h-screen flex flex-col justify-center items-center">
      {/* <svg
        width="634"
        height="856"
        viewBox="0 0 634 856"
        fill="url(#img1)"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M154 238.552L263.427 204C282.118 197.667 323.7 185.3 340.5 186.5C357.3 187.7 396.167 198.667 413.5 204L518 233.454C513.086 238.363 500.537 254.979 489.651 282.167C478.765 309.355 489.273 335.788 495.888 345.606L510.629 751.166C474.91 750.033 459.601 765.893 371.72 780.62C367.25 781.369 362.708 781.93 358.112 782.318C354.923 782.588 351.709 782.774 348.474 782.883C283.021 785.089 209.349 755.553 177.813 738.705L166.474 345.606C170.253 340.131 177.813 323.516 177.813 300.859C177.813 278.202 161.938 249.881 154 238.552Z"
          stroke="black"
        />
        <path
          d="M510.629 751.057C474.91 749.924 459.601 765.784 371.72 780.511C367.25 781.26 362.709 781.821 358.112 782.209C427.284 781.644 506.661 759.554 510.629 757.854C513.805 756.495 511.952 752.757 510.629 751.057Z"
          fill="#D9D9D9"
          stroke="black"
        />
        <path
          d="M341 164C308.6 163.6 287.333 173.333 281 178C284.333 184.667 293.9 200.7 305.5 211.5C317.1 222.3 328.333 227 332.5 228H344C348.167 227 359.4 222.3 371 211.5C382.6 200.7 392.167 184.667 395.5 178C390.833 173.667 373.4 164.4 341 164Z"
          stroke="black"
        />
        <path
          d="M396.5 344V385L429.5 399.5L455 385V344M396.5 344V332.5H455V344M396.5 344H455"
          stroke="black"
        />
        <path
          d="M264 204L281 178C284.333 184.667 293.9 200.7 305.5 211.5C317.1 222.3 328.333 227 332.5 228L305.5 255L264 204Z"
          stroke="black"
        />
        <path
          d="M412.5 204L395.5 178C392.167 184.667 382.6 200.7 371 211.5C359.4 222.3 348.167 227 344 228L371 255L412.5 204Z"
          stroke="black"
        />
        <path d="M331.5 210V201H351.5V210H331.5Z" fill="#D9D9D9" />
        <path
          d="M281.5 177.5C287.833 172.833 308.6 163.6 341 164C373.4 164.4 390.833 173.167 395.5 177.5M331.5 201V210H351.5V201H331.5Z"
          stroke="black"
        />
        <path
          d="M348.473 782.883L333.165 228.356M344 228.357L358.112 782.318"
          stroke="black"
        />
        <path
          d="M227 522.5C231 602.5 209 692.833 197.5 728C195.667 730.667 192.6 736 195 736C197.4 736 203 725.333 205.5 720C206.334 716.833 207.5 713.4 205.5 725C203.5 736.6 208.667 737.167 211.5 736C219.334 704 236.4 632.7 242 603.5C247.6 574.3 239.667 479.333 235 435.5L227 424C225.334 423.5 223 442.5 227 522.5Z"
          fill="#D9D9D9"
          fill-opacity="0.3"
        />
        <path
          d="M401.664 580.576L381.486 454.376C379.396 441.31 384.552 448.932 387.391 454.376L390.836 470.707L406.093 561.275L446.45 697.498L464.659 758H454.324L433.162 691.559L401.664 580.576Z"
          fill="#D9D9D9"
          fill-opacity="0.3"
        />
        <path
          d="M433.162 418L454.324 489.266L478.932 573.524C481.544 568.501 485.611 558.491 485.175 551.471C482.942 546.532 481.734 543.442 483.853 546.799C484.656 548.071 485.063 549.673 485.175 551.471C487.09 555.707 489.758 561.302 491.728 565.358V587.258V609.9L501.078 657.039L506 685.62C503.867 688.961 498.027 689.851 491.728 666.69C485.428 643.528 480.572 604.084 478.932 587.258C474.174 584.907 464.659 577.236 464.659 565.358C464.659 553.48 454.816 520.074 449.895 504.856C448.254 495.948 443.792 476.646 439.067 470.707C433.162 463.284 442.513 451.406 433.162 436.188C425.681 424.013 430.045 418.99 433.162 418Z"
          fill="#D9D9D9"
          fill-opacity="0.3"
        />
        <path
          d="M296.957 618.148L311.647 518.673C313.167 508.374 309.414 514.381 307.347 518.673L304.839 531.546L293.732 602.935L264.353 710.31L251.096 758H258.62L274.026 705.629L296.957 618.148Z"
          fill="#D9D9D9"
          fill-opacity="0.3"
        />
        <path
          d="M274.026 490L258.62 546.175L240.706 612.59C238.804 608.63 235.843 600.74 236.161 595.207C237.786 591.314 238.666 588.878 237.123 591.524C236.538 592.526 236.242 593.789 236.161 595.207C234.767 598.545 232.824 602.956 231.39 606.153V623.415V641.262L224.583 678.419L221 700.948C222.553 703.581 226.804 704.283 231.39 686.026C235.976 667.769 239.511 636.678 240.706 623.415C244.169 621.562 251.096 615.515 251.096 606.153C251.096 596.79 258.262 570.459 261.845 558.463C263.039 551.441 266.288 536.227 269.727 531.546C274.026 525.694 267.219 516.332 274.026 504.336C279.472 494.74 276.296 490.78 274.026 490Z"
          fill="#D9D9D9"
          fill-opacity="0.3"
        />
        <defs>
          <pattern
            id="img1"
            patternUnits="userSpaceOnUse"
            width="300"
            height="300"
          >
            <image
              href="/images/tela-test.jpg"
              x="0"
              y="0"
              width="300"
              height="300"
            />
          </pattern>
        </defs>
      </svg> */}
      {/* <div className="relative max-w-full max-h-fit w-[634px] h-[856px]">
        <div className="absolute top-0 left-0">
          <svg
            className="max-w-full max-h-fit w-[634px] h-[856px]"
            // width="100%"
            // height="fit"
            viewBox="0 0 634 856"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M263.427 204L154 238.552C161.938 249.88 177.813 278.202 177.813 300.859C177.813 323.516 170.253 340.131 166.474 345.606L177.813 738.705C209.349 755.552 283.021 785.089 348.474 782.883M510.629 751.166C474.91 750.033 459.601 765.893 371.72 780.62C367.25 781.369 362.708 781.93 358.112 782.318M510.629 751.166L495.888 345.606C489.273 335.788 478.765 309.355 489.651 282.167C500.537 254.978 513.086 238.363 518 233.454L413.5 204M510.629 751.166C511.952 752.865 513.804 756.604 510.629 757.963C506.66 759.662 427.283 781.753 358.112 782.318M348.474 782.883L333.165 228.356L343.371 223.825L358.112 782.318M348.474 782.883C351.709 782.774 354.923 782.588 358.112 782.318"
              stroke="black"
            />
          </svg>
        </div>
        <div className="absolute top-0 left-0">
          <svg
            className="max-w-full max-h-fit w-[634px] h-[856px]"
            width="634"
            height="856"
            viewBox="0 0 634 856"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M264 204L281 178C284.333 184.667 293.9 200.7 305.5 211.5C317.1 222.3 328.333 227 332.5 228L305.5 255L264 204Z"
              stroke="black"
            />
            <path
              d="M412.5 204L395.5 178C392.167 184.667 382.6 200.7 371 211.5C359.4 222.3 348.167 227 344 228L371 255L412.5 204Z"
              stroke="black"
            />
            <path
              d="M281.5 177.5C287.833 172.833 308.6 163.6 341 164C373.4 164.4 390.833 173.167 395.5 177.5M292.5 196C301.167 192.667 322.5 186 338.5 186C354.5 186 375.833 192.667 384.5 196M331.5 201V210H351.5V201H331.5Z"
              stroke="black"
            />
            <path d="M333.5 227.5L343.5 224.5" stroke="black" />
          </svg>
        </div>
        <div className="absolute top-0 left-0">
          <svg
            className="max-w-full max-h-fit w-[634px] h-[856px]"
            viewBox="0 0 634 856"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M263 204L279.5 198.5V186.5C288.333 191 311.4 199.7 333 198.5C354.6 197.3 381.667 188 392.5 183.5V198.5L413 204"
              stroke="black"
            />
            <path
              d="M393 183C386.5 181.166 365.7 177.8 334.5 179C303.3 180.2 285.167 184.167 280 186"
              stroke="black"
            />
            <path
              d="M279.5 198C288.167 203 307.5 211.353 339 209.5C364.5 208 377.5 201.333 392 198"
              stroke="black"
            />
            <path d="M364 206.5V193.5" stroke="black" />
            <circle cx="357.5" cy="202.5" r="2" stroke="black" />
            <path d="M333.5 227.5V210.5M343.5 224.5V209" stroke="black" />
          </svg>
        </div>
        <div className="absolute top-0 left-0">
          <svg
            className="max-w-full max-h-fit w-[634px] h-[856px]"
            viewBox="0 0 634 856"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M396.5 344V385L429.5 399.5L455 385V344M396.5 344V332.5H455V344M396.5 344H455"
              stroke="black"
            />
          </svg>
        </div>
      </div> */}

      <StepTitle title="Diseña tu camisa" />
      <Design size={600} />
    </div>
  );
}
