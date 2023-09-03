import React, { useEffect, useState } from 'react'

const Loader = () => {
    const [randomFact, setRandomFact] = useState(0);
    const jobFacts:Array<string> = [
        "Research has shown that candidates who smile during job interviews are often perceived as more confident and likable by interviewers.",
        "Approximately 70% of job positions are filled through networking and referrals. Building a strong professional network can significantly boost job prospects.",
        "The ideal length for a resume is usually one page for those with less experience and up to two pages for candidates with extensive experience.",
        "Sending a thank-you email within 24 hours after an interview can increase your chances of getting the job. It's a small gesture that leaves a positive impression.",
        "Dressing appropriately for an interview is crucial. Studies have shown that candidates who dress professionally are more likely to be offered the job.",
        "LinkedIn profiles with professional headshots receive significantly more views than those without a photo.",
        "Using relevant keywords in your resume and LinkedIn profile can improve your discoverability by recruiters and hiring managers.",
        "Some job seekers have lucky charms or rituals they believe bring them good luck before an interview, like wearing a specific tie or carrying a lucky pen.",
        "Creative job titles like 'Digital Prophet' or 'Innovation Catalyst' have gained popularity, but using traditional titles can often be more effective for job search algorithms.",
        "Job postings typically see a surge after the New Year and in the fall when companies finalize budgets and hiring plans.",
        "Volunteering can enhance your resume and make you more attractive to employers. It showcases your dedication and community involvement.",
        "Contrary to popular belief, job hopping (changing jobs frequently) is not always seen negatively by employers, especially among younger professionals.",
        "Having a diverse skill set can make you more adaptable to different job roles and industries, increasing your job opportunities.",
        "Many people successfully switch careers at some point in their lives. It's never too late to pursue a new career path if you're passionate about it.",
        "Maintaining a positive attitude during a job search can have a significant impact on your mental well-being and your success in finding a job.",
        "Negotiating your salary is a common practice and can result in higher earnings. Many employers expect candidates to negotiate.",
        "Job satisfaction is often influenced by factors like work-life balance, company culture, and opportunities for growth, not just salary.",
        "There are numerous job search apps available that make it easy to search for and apply to jobs on the go.",
        "Research suggests that late morning (around 10:30 a.m.) is the best time for job interviews because interviewers are often in a better mood.",
        "Lifelong learning is essential in today's fast-paced job market. Continuously upgrading your skills can lead to more job opportunities and career growth."
    ];
    
    useEffect(() => {
        // Generate a random index when the component mounts
        setRandomFact(jobFacts[Math.floor(Math.random() * jobFacts.length)]);
    },[]);


    return (
        <div className='w-full h-max flex flex-col gap-4 justify-center items-center'>
            <div className="custom-loader"></div>
            <h1 className="text-md text-main/50 font-second">
                {
                    randomFact
                }

            </h1>

        </div>
    )
}

export default Loader
