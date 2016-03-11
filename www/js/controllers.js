angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});


})

.controller('PlaylistsCtrl', function ($scope, $timeout, $ionicModal, $cordovaDeviceMotion, $ionicPlatform) {


    $scope.gif = false;
    $scope.questionAsked = false;
    $scope.currQuestion = "none";
    $scope.hasStartedPlaying = 'no';
    $scope.hasFinishedPlaying = false;
    $scope.choice1Selected = false;
    $scope.choice2Selected = false;
    $scope.choice3Selected = false;
    $scope.choice4Selected = false;
    $scope.showAvatarAnswerMessage = false;
    $scope.youGotItRight = false;


    $scope.score = 0;
    $scope.quizLength = 3;
    $scope.currQuizNumber = 0;
    $scope.questionAnswered = false;

    $scope.startPlaying = function () {
        $scope.hasStartedPlaying = 'almost';
    }


    //question bank
    var sportsQuestions = [
        {
            question: 'Who was the first African American Major League Baseball player?',
            choice1: 'Larry Doby',
            choice2: 'Ernie Banks',
            choice3: 'Satchel Page',
            choice4: 'Jackie Robinson',
            dateDescription: 'Apr 15 1947',
            shortDescription: 'Jackie Robinson plays in first game as a major leaguer with Brooklyn Dodgers',
            info: 'In his first season, with Eddie Stanky entrenched at second base for the Dodgers, Robinson was forced to play first base.',
            longDescription: 'On April 15, 1947 Robinson made his debut before a crowd of 26,623 spectators at Ebbets Field, including more than 14,000 black patrons. Although he failed to get a base hit, the Dodgers won 5–3. Robinson became the first player since 1887 to break the baseball color line.',
            quote: 'I am not concerned with your liking or disliking me. All I ask is that you respect me as a human being.”',
            answer: 'Jackie Robinson',
            imageUrl: 'img/fact-images/4_jackieRobinson.jpg'
        },
        {
            question: 'Where was Malcolm X killed?',
            choice1: 'His House, Queens',
            choice2: 'Downtown Boston',
            choice3: 'Audobon Ballroom, Manhattan',
            choice4: 'Massachusetts State Prison',
            dateDescription: 'Feb 21 1965',
            shortDescription: 'Malcolm X Assassinated in Manhattan\'s Audubon Ballroom',
            info: 'On February 21, 1965, in Manhattan\'s Audubon Ballroom, Malcolm X began to speak to a meeting of the Organization of Afro-American Unity when a disturbance broke out in the crowd of 400.',
            longDescription: ["'A man yelled, 'Nigger! Get your hand outta my pocket!' As Malcolm X and his bodyguards moved to quiet the disturbance, a man rushed forward and shot him in the chest with a sawed-off shotgun. Two other men charged the stage and fired handguns, hitting him 16 times. Angry onlookers caught and beat one of the assassins as the others fled the ballroom. Malcolm X was pronounced dead shortly after he arrived at Columbia Presbyterian Hospital.", "Talmadge Hayer, a Black Muslim also known as Thomas Hagan, was arrested on the scene. Eyewitnesses identified two more suspects, Norman 3X Butler and Thomas 15X Johnson, also members of the Nation of Islam. All three were charged in the case. At first Hayer denied involvement, but during the trial he confessed to having fired shots into Malcolm X\'s body. He testified that Butler and Johnson were not present and were not involved in the assassination, but he declined to name the men who had joined him in the shooting. All three men were convicted.\n\n Butler, now known as Muhammad Abdul Aziz, was paroled in 1985. He became the head of the Nation of Islam\'s Harlem mosque in New York in 1998. He continues to maintain his innocence.Johnson, now known as Khalil Islam, was released from prison in 1987. During his time in prison, he rejected the teachings of the Nation of Islam and converted to Sunni Islam. He, too, maintains his innocence. Hayer, now known as Mujahid Halim, was paroled in 1993."],
            answer: 'Audobon Ballroom, Manhattan',
            imageUrl: 'img/fact-images/Malcolm-X-9.jpg'
        },
        {
            question: 'Where was the first "sit-in" at a segregated lunch counter?',
            choice1: 'Jackson, Mississippi',
            choice2: 'Greensboro, North Carolina',
            choice3: 'Atlanta, Georgia',
            choice4: 'Charleston, South Carolina',
            dateDescription: 'Feb 1 1960',
            shortDescription: 'Four black students sit at a segregated lunch counter in Woolworth\'s, sparking the Greensboro sit-ins',
            info: 'The sit-ins were very significant to the movement.',
            longDescription: 'They symbolized a change in the mood of African-American people. Up until then, we had accepted segregation — begrudgingly — but we had accepted it. We had spoken against it, we had made speeches, but no one had defied segregation. At long last after decades of acceptance, four freshman students at North Carolina A&T went into Woolworth and at the lunch counter they "sat-in." When told they would not be served, they refused to leave and this sparked a movement throughout the South. Black students in colleges throughout the South saw it on television they said "Hey man, look at what our brothers and sisters in Greensboro are doing. What\'s wrong with us? Why don\'t we go out and do the same thing?" And they went out, so it swept across the South like the proverbial wildfire, with students rejecting segregation. With their very bodies they obstructed the wheels of injustice.',
            answer: 'Greensboro, North Carolina',
            imageUrl: 'img/fact-images/sit-in.jpg'
        },
        {
            question: 'At its height, what was the slave population in the U.S.?',
            choice1: 'About 2 Million',
            choice2: 'About 500,000',
            choice3: 'About 4 Million',
            choice4: 'About 1 Million',
            dateDescription: '',
            shortDescription: 'The slave population in the United States had grown to four million by the 1860 Census.',
            info: '',
            longDescription: '',
            answer: 'About 4 Million',
            imageUrl: 'img/fact-images/slavery.jpg'
        },
        {
            question: 'Who was the first African American Nobel Peace Prize winner?',
            choice1: 'Albert John Lutul',
            choice2: 'Ralph Bunche',
            choice3: 'Nelson Mandela',
            choice4: 'Martin Luther King Jr.',
            dateDescription: 'Dec 10 1950',
            shortDescription: 'Ralph Bunche Becomes First African American to Win Nobel Peace Prize',
            info: 'In 1950 the Norwegian Nobel Committee awarded the Nobel Peace Prize to the first non-white person, the African-American and United Nations (UN) official Ralph Bunche.',
            longDescription: 'He received the Peace Prize for his efforts as mediator between Arabs and Jews in the Israeli-Arab war in 1948-1949. These efforts resulted in armistice agreements between the new state of Israel and four of its Arab neighbours: Egypt, Jordan, Lebanon and Syria. Two members of the Norwegian parliament nominated Ralph Bunche for the Nobel Peace Prize. Both had connections to the newly founded United Nations. One was Norway\'s first UN ambassador, and the other was a member of the Norwegian UN delegation. The nomination stated: "Although it can not be said to be Dr. Bunche\'s merit, but the development process itself that made the parties end the hostilities, there can be no doubt that it is Dr. Bunche\'s merit that the challenging negotiations over a ceasefire were brought to a positive result in a relatively short time". The nominators had several motives. Awarding the Nobel Peace Prize to Bunche "would thereby not only honour him personally, but express trust and faith in the ability of the United Nations to solve international disputes by way of mediation between the parties". Furthermore, the nominators could not "neglect to mention that giving the Nobel Peace Prize to a member of the coloured race is a boost to peace in itself". Thus the Peace Prize was meant to strengthen the UN and to serve as an initiative against racism as well as to honour Ralph Bunche.',
            answer: 'Ralph Bunche',
            imageUrl: 'img/fact-images/ralph-bunche.jpg'
        },
        {
            question: 'Who was the first African American to serve as a U.S. Senator?',
            choice1: 'Edward Brooke',
            choice2: 'Hiram Revels',
            choice3: 'Blanche K. Bruce',
            choice4: 'Carol Mosley Braun',
            dateDescription: 'Feb 25 1870',
            shortDescription: 'Hiram Revels Becomes the First African American Elected to US Senate',
            info: 'At the time, the state legislature elected US senators.',
            longDescription: 'Hiram Rhoades Revels was born a free man of African American and Indian descent in a slave state and became the first African American member of Congress. In the process, Revels ministered to the spiritual needs and expanded opportunities for education for the African American community. Struggling to keep his political and pastoral duties separate and to avoid racial conflict, Revels earned the respect of both whites and African Americans. His success in managing these forces led to his election as a state senator from Adams County, Mississippi. In 1870 Revels was elected as the first African American member of the United States Senate. Ironically, Revels was elected to fill the position vacated by Jefferson Davis almost 10 years earlier. Revels took his seat in the Senate on February 25, 1870 and served through March 4, 1871, the remainder of Davis\' vacated term.',
            answer: 'Hiram Revels',
            imageUrl: 'img/fact-images/hiram-revels.png'
        },
        {
            question: 'Who was the first African American to serve as a US Supreme Court Justice?',
            choice1: 'Clarence Thomas',
            choice2: 'Thurgood Marshall',
            choice3: 'William Henry Hastie',
            choice4: 'Charles Hamilton Houston',
            dateDescription: '',
            shortDescription: '',
            info: '',
            longDescription: '',
            answer: 'Thurgood Marshall',
            imageUrl: 'img/fact-images/thurgood-marshall.jpg'
        },
        {
            question: 'Who was the first African American to win an Academy Award?',
            choice1: 'Hattie McDaniel',
            choice2: 'Halle Berry',
            choice3: 'Sidney Poitier',
            choice4: 'Dorothy Dandridge',
            dateDescription: 'Feb 29 1940',
            shortDescription: '12th Academy Awards',
            info: 'The twelfth Academy Awards ceremony was held on Thursday, February 29, 1940 at the Coconut Grove of the Ambassador Hotel.',
            longDescription: 'Though the winners were supposed to be kept a secret, attendees who had happened to buy a newspaper before the show knew who had won. For years, the Academy had given a winners list to newspapers early so that they could announce the winners in their late editions. Unfortunately, the Los Angeles Times announced the winners in their 8:45 p.m. edition. Ever since the twelfth Awards ceremony, the winners have been kept an absolute secret. Though there were many great contenders this year for the awards, Gone With the Wind had an Oscar sweep by winning eight Academy Awards. Hattie McDaniel (Gone With the Wind) became the first African-American actress to be nominated and to win. Bob Hope hosted the event.',
            answer: 'Hattie McDaniel',
            imageUrl: 'img/fact-images/hattie-mcdaniel.jpg'
        },
        {
            question: 'Who was the first African American to perform at the White House?',
            choice1: 'B.B. King',
            choice2: 'Louis Armstrong',
            choice3: '"Blind Tom" Wiggins',
            choice4: 'Aretha Franklin',
            dateDescription: '1860',
            shortDescription: '"Blind Tom" Wiggins is first African American to perform at White House',
            info: 'In 1860, Blind Tom performed at the White House before President James Buchanan.',
            longDescription: 'In 1859, at the age of 10, he became the first African American performer to play at the White House when he gave a concert before President James Buchanan.',
            answer: '"Blind Tom" Wiggins',
            imageUrl: ''
        },
        {
            question: 'What year was the Thirteenth Amendment ratified, abolishing slavery?',
            choice1: '1872',
            choice2: '1865',
            choice3: '1862',
            choice4: '1867',
            dateDescription: 'Dec 6 1865',
            shortDescription: 'The Thirteenth Amendment is ratified',
            info: 'The Thirteenth Amendment to the United States Constitution officially abolished and continues to prohibit slavery and involuntary servitude, except as punishment for a crime.',
            longDescription: 'It was adopted on December 6, 1865, and was then declared in a proclamation of Secretary of State William H. Seward on December 18. President Abraham Lincoln and others were concerned that the Emancipation Proclamation would be seen as a temporary war measure and so, besides freeing slaves in those states where slavery was still legal, they supported the amendment as a means to guarantee the permanent abolition of slavery. The Thirteenth Amendment is the first of the Reconstruction Amendments.',
            answer: '1865',
            imageUrl: 'img/fact-images/thirteenth-ammendment.jpg'
        },
        {
            question: 'Who signed The Emancipation Act?',
            choice1: 'Ulysses S. Grant',
            choice2: 'James Buchanan',
            choice3: 'Abraham Lincoln',
            choice4: 'Andrew Johnson',
            dateDescription: 'Apr 16 1862',
            shortDescription: 'Lincoln Signs The Emancipation Act',
            info: 'On April 16, 1862, President Lincoln signed an act abolishing slavery in the District of Columbia, an important step in the long road toward full emancipation and enfranchisement for African Americans.',
            longDescription: 'This illustration from Harper\'s Weekly depicts the fourth anniversary of the District\'s Emancipation Act. On April 19, 1866, African American citizens of Washington, D.C., staged a huge celebration. Approximately 5,000 people marched up Pennsylvania Avenue, past 10,000 cheering spectators, to Franklin Square for religious services and speeches by prominent politicians. Two of the black regiments that had gained distinction in the Civil War led the procession.',
            quote: '…I generally went up into the city to see the new and splendid buildings; often walked as far as Georgetown, and made many new acquaintances among the slaves, and frequently saw large numbers of people of my color chained together in long trains, and driven off towards the South.',
            quoteSource: 'Charles Ball, "Fifty Years in Chains or The Life of an American Slave,"',
            answer: 'Abraham Lincoln',
            imageUrl: 'img/fact-images/emancipation.jpeg'
        },
        {
            question: 'With the 15th Amendment ratification in 1870, what did African Americans gain in the United States?',
            choice1: 'Right to Citizenship Status',
            choice2: 'Voting Rights',
            choice3: 'Right to Sit Anywhere',
            choice4: 'Freedom from Slavery',
            dateDescription: 'Feb 3 1870',
            shortDescription: 'The Fifteenth Amendment is ratified',
            info: 'On April 16, 1862, President Lincoln signed an act abolishing slavery in the District of Columbia, an important step in the long road toward full emancipation and enfranchisement for African Americans.',
            longDescription: "The Fifteenth Amendment (Amendment XV) to the United States Constitution prohibits each government in the United States from denying a citizen the right to vote based on that citizen's 'race, color, or previous condition of servitude' (i.e., slavery). It was ratified on February 3, 1870. The Fifteenth Amendment is one of the Reconstruction Amendments.",
            quote: 'Section 1. The right of citizens of the United States to vote shall not be denied or abridged by the United States or by any State on account of race, color, or previous condition of servitude. Section 2. The Congress shall have power to enforce this article by appropriate legislation.',
            quoteSource: '15th Amendment to the Constitution of the United States',
            answer: 'Voting Rights',
            imageUrl: 'img/fact-images/fifteenth-ammendment.png'
        },
        {
            question: 'Who was the only African American among the original NAACP executives?',
            choice1: 'W.E.B. Du Bois',
            choice2: 'Rosa Parks',
            choice3: 'Martin Luther King Jr.',
            choice4: 'Frederick Douglass',
            dateDescription: 'Feb 12 1909',
            shortDescription: 'The National Association for the Advacement of Colored People (NAACP) is founded',
            info: 'Founded Feb. 12. 1909, the NAACP is the nation\'s oldest, largest and most widely recognized grassroots–based civil rights organization.',
            longDescription: "Its more than half-million members and supporters throughout the United States and the world are the premier advocates for civil rights in their communities, conducting voter mobilization and monitoring equal opportunity in the public and private sectors. The NAACP was formed partly in response to the continuing horrific practice of lynching and the 1908 race riot in Springfield, the capital of Illinois and resting place of President Abraham Lincoln. Appalled at the violence that was committed against blacks, a group of white liberals that included Mary White Ovington and Oswald Garrison Villard, both the descendants of abolitionists, William English Walling and Dr. Henry Moscowitz issued a call for a meeting to discuss racial justice. Some 60 people, seven of whom were African American (including W. E. B. Du Bois, Ida B. Wells-Barnett and Mary Church Terrell), signed the call, which was released on the centennial of Lincoln's birth. Other early members included Joel and Arthur Spingarn, Josephine Ruffin, Mary Talbert, Inez Milholland, Jane Addams, Florence Kelley, Sophonisba Breckinridge, John Haynes Holmes, Mary McLeod Bethune, George Henry White, Charles Edward Russell, John Dewey, William Dean Howells, Lillian Wald, Charles Darrow, Lincoln Steffens, Ray Stannard Baker, and Fanny Garrison Villard. ",
            quote: '',
            quoteSource: '',
            answer: 'W.E.B. Du Bois',
            imageUrl: 'img/fact-images/web-dubois.jpg'
        },
        {
            question: 'An all white jury acquitted J. W. Milam and Roy Bryant for the murder of whom?',
            choice1: 'Medgar Evers',
            choice2: 'Malcolm X',
            choice3: 'Martin Luther King Jr.',
            choice4: 'Emmett Till',
            dateDescription: 'Sep 23 1955',
            shortDescription: 'All-White Jury Acquitted J.W. Milam and Roy Bryant for the Murder of Emmett Till',
            info: 'Mrs. Bradley traveled to Mississippi to testify at the trial, staying in the home of Dr. T.R.M. Howard in the all-black town of Mound Bayou.',
            longDescription: "The circumstances surrounding the death of Emmett Till provide chilling insight into the racism that dominated the South in the 1950s. Till was a fourteen-year-old Chicago native visiting relatives in Mississippi. While out with his cousins and friends on the night of 24 August 1955, he allegedly accosted a white woman in the grocery store owned by her husband. Accounts vary as to what Till actually said or did. According to the woman Till grabbed her and made lewd remarks. Some witnesses claimed that he only whistled at her. Still others asserted that he made no advances at all, that he whistled habitually to control a speech defect.\n\n Roy Bryant considered his wife's honor tainted by the incident. Several nights after the episode, Bryant, his half brother J. W. Milam, and possibly other accomplices kidnapped Till from his relatives' home in the middle of the night. The two men beat him severely and, apparently enraged that he had a picture of a white woman in his wallet, shot Till and threw him in a nearby river. Several days later the body was found, and Bryant and Milam were charged with murder.\n\nMississippi politicians and newspapers unanimously condemned the murderers and promised swift justice. However, Mississippians became more defensive as for weeks the press bombarded them with harsh condemnations of racial violence in the South. The highly publicized trial of the two men was charged with racial tension. African-American politicians and reporters from the North were treated contemptuously and were segregated in the courtroom. The prosecution was poorly prepared, and the substance of the defense was the astounding claim that Till was not actually dead. The badly decomposed body was identified only by Till's ring on its finger. The sheriff of Tallahatchee County, who investigated the case, speculated on the witness stand that an unnamed group of 'rabble-rousers' had planted the evidence. The all-male, all-white jury was apparently convinced: they acquitted Bryant and Milam after deliberating slightly longer than an hour. \n\n News of the verdict was received around the country and the world with astonishment. A survey of European reactions conducted by the American Jewish Committee reported that American prestige had been 'seriously damaged' by the outcome of the trial. The press in Mississippi, on the other hand, closed ranks and praised the fairness of the trial. \n\n The truth of what happened that night became public knowledge several months after the trial. William Bradford Huie, an Alabama journalist in Mississippi to report on the aftermath of the case, offered Bryant and Milam money to tell their story. Since the two could no longer be prosecuted for a crime of which they had already been acquitted, they gladly told for a fee of how they had beaten and killed young Till. Huie reported what the killers told him in the 24 January 1956 issue of Look magazine. Now publicly exposed as murderers, Bryant and Milam were ostracized by the community, and both moved elsewhere within a year. Emmett Till in death became a martyr for the civil rights movement, a symbol of the racial hatred African-Americans had yet to overcome.",
            quote: '',
            quoteSource: '',
            answer: 'Emmett Till',
            imageUrl: 'img/fact-images/emmett-till.jpg'
        },
        {
            question: 'Who shot Martin Luther King on April 4, 1968?',
            choice1: 'John Wilkes Booth',
            choice2: 'Lee Harvey Oswald',
            choice3: 'James Earl Ray',
            choice4: 'Gavrilo Princip',
            dateDescription: 'Apr 4 1968 6:01PM',
            shortDescription: 'Martin Luther King, Jr. Assassinated at Lorraine Motel',
            info: 'In March 1968, Reverend King went to Memphis, Tennessee in support of striking African American sanitation workers.',
            longDescription: "The workers had staged a walkout on February 11, 1967, to protest unequal wages and working conditions. At the time, the city of Memphis paid black workers significantly lower wages than whites. In addition, unlike their white counterparts, blacks received no pay if they stayed home during bad weather; consequently, most blacks were compelled to work even in driving rain and snow storms. \n\n On April 3, King returned to Memphis to address a gathering at the Mason Temple (World Headquarters of the Church of God in Christ). King was booked in room 306 at the Lorraine Motel in Memphis, owned by black businessman Walter Bailey (and named after his wife). King's close friend and colleague, Reverend Ralph David Abernathy, who was present at the assassination, told the House Select Committee on Assassinations that King and his entourage stayed in room 306 at the Lorraine Motel so often that it was known as the 'King-Abernathy Suite.'\n\n According to biographer Taylor Branch, King's last words were to musician Ben Branch, who was scheduled to perform that night at an event King was going to attend: 'Ben, make sure you play 'Take My Hand, Precious Lord' in the meeting tonight. Play it real pretty.' \n\n At 6:01 p.m. on April 4, 1968, while he was standing on the motel's second floor balcony, King was struck by a single bullet fired from a rifle. The bullet travelled through the right side of his neck, smashing his throat and then going down his spinal cord before lodging in his shoulder. \n\n King was rushed to St. Joseph's Hospital, where doctors opened his chest and performed manual heart massage. He was pronounced dead at 7:05 p.m. According to biographer Taylor Branch, King's autopsy revealed that though he was only 39 years old, he had the heart of a 60 year old man.",
            quote: '',
            quoteSource: '',
            answer: 'James Earl Ray',
            imageUrl: 'img/fact-images/mlk-shot.jpg'
        },
        {
            question: 'Who became the first African American to graduate from Harvard University?',
            choice1: 'Charles Hamilton Houston',
            choice2: 'W. E. B. Du Bois',
            choice3: 'Richard Theodore Greener',
            choice4: 'Thurgood Marshall',
            dateDescription: '1870',
            shortDescription: 'Richard Theodore Greener Becomes First African American to Graduate from Harvard',
            info: 'Richard Theodore Greener (30 January 1844 – 2 May 1922) was the first African-American graduate of Harvard College and dean of the Howard University School of Law.',
            longDescription: "Richard Theodore Greener graduated from Harvard College in 1870, the first African American to do so. Gifted, hardworking, and ambitious, Greener followed this achievement with a lifetime of accomplishment as an educator, scholar, lawyer, politician, and diplomat. He also contended with painful choices about how best to survive and prosper in a country that denied people of color respect and equal rights.",
            quote: '',
            quoteSource: '',
            answer: 'Richard Theodore Greener',
            imageUrl: 'img/fact-images/richard-theodore-greener.jpg'
        },
        {
            question: 'The PGA was considered "Caucasian Only" until which golfer joined?',
            choice1: 'Tiger Woods',
            choice2: 'Charles Sifford',
            choice3: 'Lee Elder',
            choice4: 'Pete Brown',
            dateDescription: '1960',
            shortDescription: 'Charles Sifford Becomes First African American to play on the PGA Tour',
            info: 'As February is Black History Month, it’s fitting to talk about Charles Sifford, the first African-American to play on the PGA tour.',
            longDescription: "Sifford was born in rural North Carolina in 1922. He started in golf as a caddie in the 1930s, making 60 cents/day. Of course, caddies get to play in their free time and by age 13, Sifford was frequently shooting par.\n\n Charles Sifford won the National Negro Open five times in a row (1952-1956), while repeatedly being denied a PGA card. He was finally invited to the tour in 1960, when the PGA dropped it’s “Caucasian Only” rule, under pressure from the California attorney general. \n\n Even though he was 39 when he joined the PGA, Sifford won two events–the 1967 Greater Hartford Open and the 1969 Los Angeles Open. He went on the become one of the original members of the Champions Tour in 1975. \n\n Sifford made history again in 2004 when he became the first African-American inductee in the World Golf Hall of Fame in St. Augustine, Florida. \n\n Two generations of African-American golfers are indebted to Mr. Sifford’s efforts. Tiger Woods was quoted at Mr. Sifford’s induction into the World Golf Hall of Fame as saying, “He has my respect and my gratitude for the sacrifices he made to open the doors to this great game to people of color.” ",
            quote: '',
            quoteSource: '',
            answer: 'Charles Sifford',
            imageUrl: 'img/fact-images/charles-sifford.jpg'
        },
        {
            question: 'Whose proposal that Congress consider civil rights legislation culminated in the Civil Rights Act of 1964?',
            choice1: 'Martin Luther King Jr.',
            choice2: 'Lyndon B. Johnson',
            choice3: 'Dwight Eisenhower',
            choice4: 'John F. Kennedy',
            dateDescription: 'Jul 2 1964',
            shortDescription: 'President Johnson Signs Civil Rights Act of 1964 into Law',
            info: 'The Civil Rights Act of 1964 was a landmark piece of legislation in the United States that outlawed racial segregation in schools, public places, and employment.',
            longDescription: "In a nationally televised address on June 6, 1963, President John F. Kennedy urged the nation to take action toward guaranteeing equal treatment of every American regardless of race. Soon after, Kennedy proposed that Congress consider civil rights legislation that would address voting rights, public accommodations, school desegregation, nondiscrimination in federally assisted programs, and more. \n\n Despite Kennedy’s assassination in November of 1963, his proposal culminated in the Civil Rights Act of 1964, signed into law by President Lyndon Johnson just a few hours after House approval on July 2, 1964. The act outlawed segregation in businesses such as theaters, restaurants, and hotels. It banned discriminatory practices in employment and ended segregation in public places such as swimming pools, libraries, and public schools.",
            quote: '',
            quoteSource: '',
            answer: 'John F. Kennedy',
            imageUrl: 'img/fact-images/jfk.jpg'
        },
        {
            question: 'Who established the first non-indigenous settlement of Chicago?',
            choice1: 'Sally Bayne',
            choice2: 'Pedro Alonso Nino',
            choice3: 'Jean Baptiste Pointe Du Sable',
            choice4: 'Joseph Moreno',
            dateDescription: '1779',
            shortDescription: 'Jean Baptiste Pointe du Sable Establishes First Non-Indigenous Settlement of Chicago',
            info: 'Point du Sable\'s chief occupation seems to have been that of a trader who wandered from place to place in the customary manner, and fortunately left a record now and then.',
            longDescription: "In 1779 he was in Chicago, and in the summer of that same year he was established on the River Chemin, later known as Trail Creek, probably on the site of Michigan City- Indiana. It was at this place that he was arrested by Lieut. Bennett, who had been sent by Arent S. De Peyster of the British Army to forestall an anticipated attack on Mackinac by George Rogers Clark. Point du Sable's arrest seems to have been due to his seeming attachment to the American cause, although at the time he was in the employ of a British trader named Durand, who had undertaken to guide a British war party to the Illinois country to co-operate with Bennett. In his petition for a grant of land from the United States Government, presented in 1783, Point du Sable satisfied the Commissioners that he was a citizen of the United States. He stated that as early as 1780 he had resided at Peoria with his family and had improved a farm of thirty acres between the Old Fort and the new »ettlements of Peoria. In 1790 he was again in Chicago and probably intermittently for five or six years. In this same year, on October 4, Susanne, the natural daughter of Point du Sable and an Indian woman, married Jean Baptiste Pelletier at Cahokia, and on October 7, 1799, a child born of this union was baptized in the Old Cathedral at St. Louis. The entry states that Pelletier's spouse, Susanne Point Sable, was 'Habit a Chicagou.' In 1796 he appeared at Mackinac. The next record of him is as a witness or juror on September 29, 1802, in the St. Clair County, Illinois (then Indiana Territory), Court of Common Pleas.",
            quote: '',
            quoteSource: '',
            answer: 'Jean Baptiste Pointe Du Sable',
            imageUrl: 'img/fact-images/jean-baptiste-pointe-du-sable.jpg'
        },
        {
            question: 'Who broke three track and field World Records in 45 minutes at Ohio State?',
            choice1: 'Maurice Greene',
            choice2: 'Michael Johnson',
            choice3: 'Carl Lewis',
            choice4: 'Jesse Owens',
            dateDescription: 'May 25 1935',
            shortDescription: 'Jesse Owens sets 3 world records in 45 minutes at Ohio State',
            info: 'Owens attended The Ohio State University only after employment was found for his father, ensuring the family could be supported.',
            longDescription: "Jesse gave the world a preview of things to come in Berlin, while at the Big Ten Championships in Ann Arbor on May 25, 1935, he set three world records and tied a fourth, all in a span of about 45 minutes. Jesse was uncertain as to whether he would be able to participate at all, as he was suffering from a sore back as a result from a fall down a flight of stairs. He convinced his coach to allow him to run the 100-yard dash as a test for his back, and amazingly Jesse recorded an official time of 9.4 seconds, once again tying the world record. Despite the pain, he then went on to participate in three other events, setting a world record in each event. In a span of 45 minutes, Jesse accomplished what many experts still feel is the greatest athletic feat in history...setting 3 world records and tying a fourth in four grueling track and field events.",
            quote: '',
            quoteSource: '',
            answer: 'Jesse Owens',
            imageUrl: 'img/fact-images/jesse-owens.jpg'
        },
        {
            question: 'Sarah Goode was the first African American woman to receive a patent. What did she invent?',
            choice1: 'Hair Straightening System',
            choice2: 'Dry-Cleaning Process',
            choice3: 'Folding Bed',
            choice4: 'Lip Stick',
            dateDescription: 'Jul 14 1885',
            shortDescription: 'Sarah Goode Becomes First African-American Woman to Receive a Patent',
            info: 'Sarah E. Goode (b.1850s-d. c. 1905) was the first African-American woman to receive a patent from the United States Patent and Trademark Office.',
            longDescription: "Sarah E. Goode was born into slavery in 1850. She was the first African American woman to be granted a patent by the U.S. Patent and Tradesmark Office for her invention, the cabinet bed, on July 14, 1885. Freed at the end of the Civil War, Goode moved to Chicago and became an entrepreneur. As owner of a furniture store she noted that city apartment dwellers often had little space for beds. She conceived the design of what we know today as the 'hide away' bed. She described the design as 'a folding bed' whose hinged sections were easily raised or lowered. When not in use as a bed, Goode's invention could also be used as a desk.",
            quote: '',
            quoteSource: '',
            answer: 'Folding Bed',
            imageUrl: 'img/fact-images/cabinetbed.jpg'
        },
        {
            question: 'Robert Henry Lawrence, Jr. was the first African American to become what?',
            choice1: 'Astronaut',
            choice2: 'Army General',
            choice3: 'Pilot',
            choice4: 'Policeman',
            dateDescription: 'Jun 1967',
            shortDescription: 'Robert Henry Lawrence, Jr. Becomes First African American Astronaut',
            info: 'He was a senior USAF pilot, accumulating well over 2,500 flight hours—2,000 of which were in jets.',
            longDescription: "United States Air Force Major Robert Henry Lawrence, Jr., was the first African American chosen by NASA to be an astronaut. He was a senior USAF pilot, accumulating well over 2,500 flight hours--2,000 of which was in jets. Major Lawrence flew many tests in the Lockheed F-104 Starfighter to investigate the gliding flight of various unpowered spacecraft returning to Earth from orbit, such as the North American X-15 rocket-plane. His research was instrumental in proving the steep-descent gliding concept that would later be employed with the Space Shuttle. \n\n In June 1967 Lawrence successfully completed the Air Force Flight Test Pilot Training School at Edwards AFB, California. That same month he was selected by NASA as an astronaut in the Air Force's Manned Orbiting Laboratory Program, thus becoming the first African American astronaut. The MOL project would eventually lead to today's International Space Station.",
            quote: '',
            quoteSource: '',
            answer: 'Astronaut',
            imageUrl: 'img/fact-images/Robert-Henry-Lawrence.jpg'
        },
        {
            question: 'Before it became Black History Month what was the observance of Black History called?',
            choice1: 'Freedom Day',
            choice2: 'Slave History Week',
            choice3: 'Negro History Week',
            choice4: 'Black Rights Awareness Day',
            dateDescription: 'Feb 1 1926',
            shortDescription: 'United States Observes the First Negro History Week Later Known as Black History Month',
            info: 'Carter Godwin Woodson (December 19, 1875 - April 3, 1950) was an African-American historian, author, journalist and the founder of the Association for the Study of African American Life and History.',
            longDescription: "Black History Month owes its beginning to Dr. Carter G. Woodson, a black American man born to slave parents, who later went on to earn a Ph.D. from Harvard University. Throughout his studies, the scholar was perturbed by the absence of black Americans in historical texts, despite their presence in the New World since the colonial period. In 1915, he founded the Association for the Study of Negro Life and, one year later, the Journal of Negro Life. In 1926, it was he that began Negro History Week, aiming to bring the nation’s attention to the struggles and contributions of black Americans. As part of the Nation’s bicentennial, the week was expanded to a full month in 1976. Woodson originally chose the second week of February as Negro History Week because it held the birthdays of two important figures in black history – Frederick Douglass and Abraham Lincoln.",
            quote: '',
            quoteSource: '',
            answer: 'Negro History Week',
            imageUrl: 'img/fact-images/negro-history-week.jpg'
        },
        {
            question: 'What was the first African American owned-and-operated newspaper?',
            choice1: 'Freedom\'s Journal',
            choice2: 'The Mississippi Enterprise',
            choice3: 'Birmingham Times',
            choice4: 'Our Times',
            dateDescription: 'Mar 16 1827',
            shortDescription: 'Freedom\'s Journal is Founded',
            info: 'Freedom\'s Journal was the first African American owned and operated newspaper published in the United States.',
            longDescription: "Published weekly in New York City from 16 March 1827 to 28 March 1829, the journal was edited by John Russwurm and co-editor, Samuel Cornish who contributed only through the 14 September 1827 issue. Freedom's Journal was superseded by The Rights of All, published between 1829 and 1830 by Cornish. \n\n Freedom's Journal provided international, national, and regional information on current - events and contained editorials declaiming slavery, lynching, and other injustices. The Journal also published biographies of prominent African Americans and listings of births, deaths, and marriages in the African American community in New York. Freedom's Journal circulated in 11 states, the District of Columbia, Haiti, Europe, and Canada. Freedom's Journal had many articles on information such as world wide news, and many job listings, and announcements on housing, weddings, and funerals. This helped blacks become more aware of the world. \n\n The newspaper employed subscription agents such as David Walker, who in 1829 published the first of four articles that called for rebellion. The pamphlet 'Walker's Appeal' stated, '...it is no more harm for you to kill the man who is trying to kill you than it is for you to take a drink of water...' This statement was widely read, with Walker distributing copies of his pamphlet into the Southern United States, where it was widely banned.",
            quote: '',
            quoteSource: '',
            answer: 'Freedom\'s Journal',
            imageUrl: 'img/fact-images/Freedom_s_Journal.jpg'
        },
        {
            question: 'Who is considered the "Father of Black History"?',
            choice1: 'Jesse Jackson',
            choice2: 'Martin Luther King Jr.',
            choice3: 'Malcolm X',
            choice4: 'Carter G. Woodson',
            dateDescription: 'Feb 1 1926',
            shortDescription: 'United States Observes the First Negro History Week Later Known as Black History Month',
            info: 'Carter Godwin Woodson (December 19, 1875 - April 3, 1950) was an African-American historian, author, journalist and the founder of the Association for the Study of African American Life and History.',
            longDescription: "He was one of the first scholars to value and study Black History. He recognized and acted upon the importance of a people having an awareness and knowledge of their contributions to humanity and left behind an impressive legacy. A founder of Journal of Negro History, Dr. Woodson is known as the Father of Black History.\n\n After leaving Howard University because of differences with its president, Dr. Woodson devoted the rest of his life to historical research. He worked to preserve the history of African Americans and accumulated a collection of thousands of artifacts and publications. He noted that African American contributions 'were overlooked, ignored, and even suppressed by the writers of history textbooks and the teachers who use them.' Race prejudice, he concluded, 'is merely the logical result of tradition, the inevitable outcome of thorough instruction to the effect that the Negro has never contributed anything to the progress of mankind.' In 1926, Woodson single-handedly pioneered the celebration of 'Negro History Week', for the second week in February, to coincide with marking the birthdays of Abraham Lincoln and Frederick Douglass. The week was later extended to the full month of February and renamed Black History Month.",
            quote: '',
            quoteSource: '',
            answer: 'Carter G. Woodson',
            imageUrl: 'img/fact-images/carter-j-woodson.jpg'
        },


    ];


    $scope.chooseChoice1 = function () {
        $scope.choice1Selected = true;
        $scope.choice2Selected = false;
        $scope.choice3Selected = false;
        $scope.choice4Selected = false;
        $scope.showAvatarAnswerMessage = true;

        if ($scope.currQuestion.answer == $scope.currQuestion.choice1) {
            console.log("you got it right");
            $scope.youGotItRight = true;
        } else {
            console.log("you wrong bro");
            $scope.youGotItRight = false;
        }

    }
    $scope.chooseChoice2 = function () {
        $scope.choice1Selected = false;
        $scope.choice2Selected = true;
        $scope.choice3Selected = false;
        $scope.choice4Selected = false;
        $scope.showAvatarAnswerMessage = true;

        if ($scope.currQuestion.answer == $scope.currQuestion.choice2) {
            console.log("you got it right");
            $scope.youGotItRight = true;
        } else {
            console.log("you wrong bro");
            $scope.youGotItRight = false;
        }

    }
    $scope.chooseChoice3 = function () {
        $scope.choice1Selected = false;
        $scope.choice2Selected = false;
        $scope.choice3Selected = true;
        $scope.choice4Selected = false;
        $scope.showAvatarAnswerMessage = true;

        if ($scope.currQuestion.answer == $scope.currQuestion.choice3) {
            console.log("you got it right");
            $scope.youGotItRight = true;
        } else {
            console.log("you wrong bro");
            $scope.youGotItRight = false;
        }
    }
    $scope.chooseChoice4 = function () {
        $scope.choice1Selected = false;
        $scope.choice2Selected = false;
        $scope.choice3Selected = false;
        $scope.choice4Selected = true;
        $scope.showAvatarAnswerMessage = true;

        if ($scope.currQuestion.answer == $scope.currQuestion.choice4) {
            console.log("you got it right");
            $scope.youGotItRight = true;
        } else {
            console.log("you wrong bro");
            $scope.youGotItRight = false;
        }
    }

    //making the gif animate and stop after 2000 ms
    function showGif() {
        $scope.gif = true;

        $timeout(function hideTheGif() {
            $scope.gif = false;
        }, 2000);

    }

    $scope.askQuestion = function () {
        $scope.hasStartedPlaying = 'yes';
        $scope.choice1Selected = false;
        $scope.choice2Selected = false;
        $scope.choice3Selected = false;
        $scope.choice4Selected = false;
        var chosenQuestion = Math.floor(Math.random() * (sportsQuestions.length - 0)) + 0;
        //        console.log("chosenQuestion " + chosenQuestion);

        $scope.youGotItRight = false;

        $scope.currQuizNumber++;
        console.log("currQuizNumber " + $scope.currQuizNumber);
        $scope.currQuestion = sportsQuestions[chosenQuestion];

        $scope.questionAsked = true;

        $scope.gif = true;

        $timeout(function hideTheGif() {
            $scope.gif = false;
        }, 2000);

    }

    $scope.answerQuestion = function () {
        $scope.questionAsked = false;
        $scope.questionAnswered = false;
        $scope.gif = true;
        $scope.showAvatarAnswerMessage = false;

        if ($scope.youGotItRight == true) {
            console.log("points for you!");
            $scope.score++;
        }

        if ($scope.currQuizNumber == $scope.quizLength) {
            $scope.hasFinishedPlaying = true;
        }

        $timeout(function hideTheGif() {
            $scope.gif = false;
        }, 2000);

    }

    $scope.startOver = function () {

        $scope.currQuizNumber = 0;
        $scope.hasFinishedPlaying = false;
        $scope.score = 0;
    }


    $scope.shakeMotionFunction = function (question) {
        $scope.startWatching(question);

        //        $scope.askQuestion();

    }


    //code for ionic modal
    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });


    // watch Acceleration options
    $scope.options = {
        frequency: 100, // Measure every 100ms
        deviation: 25 // We'll use deviation to determine the shake event, best values in the range between 25 and 30
    };

    // Current measurements
    $scope.measurements = {
        x: null,
        y: null,
        z: null,
        timestamp: null
    }

    // Previous measurements    
    $scope.previousMeasurements = {
        x: null,
        y: null,
        z: null,
        timestamp: null
    }

    $scope.weHaveShake = 'sorry no shake for you';
    //Start Watching method
    $scope.startWatching = function (question) {

        // Device motion configuration
        $scope.watch = $cordovaDeviceMotion.watchAcceleration($scope.options);

        // Device motion initilaization
        $scope.watch.then(null, function (error) {
            console.log('Error');
        }, function (result) {

            // Set current data  
            $scope.measurements.x = result.x;
            $scope.measurements.y = result.y;
            $scope.measurements.z = result.z;
            $scope.measurements.timestamp = result.timestamp;

            // Detect a shake  
            $scope.detectShake(result, question);

        });
    };

    // Stop watching method
    $scope.stopWatching = function () {
        $scope.watch.clearWatch();
    }
    $scope.canShake = false;
    // Detect shake method      
    $scope.detectShake = function (result, question) {

        //Object to hold measurement difference between current and old data
        var measurementsChange = {};

        // Calculate measurement change only if we have two sets of data, current and old
        if ($scope.previousMeasurements.x !== null) {
            measurementsChange.x = Math.abs($scope.previousMeasurements.x, result.x);
            measurementsChange.y = Math.abs($scope.previousMeasurements.y, result.y);
            measurementsChange.z = Math.abs($scope.previousMeasurements.z, result.z);
        }

        // If measurement change is bigger then predefined deviation
        if (measurementsChange.x + measurementsChange.y + measurementsChange.z > $scope.options.deviation) {
            $scope.stopWatching(); // Stop watching because it will start triggering like hell

            if (question == 'q') {
                $scope.askQuestion();
                $scope.stopWatching();
            }
            if (question == 'a') {
                $scope.answerQuestion();
                //                $scope.stopWatching();

                $timeout(function startWatchingThenStop() {
                    $scope.startWatching('q');
                    $scope.canShake = true;
                    //                    $scope.stopWatching();
                }, 5000);

            }

            console.log('Shake detected'); // shake detected
            $scope.weHaveShake = 'Yes we have shake';
            $scope.gif = true;

            $timeout(function hideTheGif() {
                $scope.gif = false;
            }, 2000);
            setTimeout($scope.stopWatching(), 2000); // Again start watching after 1 sex

            // Clean previous measurements after succesfull shake detection, so we can do it next time
            $scope.previousMeasurements = {
                x: null,
                y: null,
                z: null
            }

        } else {
            // On first measurements set it as the previous one
            $scope.previousMeasurements = {
                x: result.x,
                y: result.y,
                z: result.z
            }
        }

    }

})

.controller('PlaylistCtrl', function ($scope, $stateParams) {});