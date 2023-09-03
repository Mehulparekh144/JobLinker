import React from 'react'
import MotionDiv from '../components/MotionDiv'
import { RoughNotation } from 'react-rough-notation'
import JobComponent from '../components/JobComponent'


const Home = () => {

    const jobDetails = [
        {
            "title": "Software Engineer",
            "company": "Google",
            "type": "Full-time",
            "salary": 100000,
            "location": "Mountain View, CA",
            "applicants": 1000,
            "date": "2023-09-01",
            "experience": "1-2 years"
        },
        {
            "title": "Data Scientist",
            "company": "Amazon",
            "type": "Contract",
            "salary": 150000,
            "location": "Seattle, WA",
            "applicants": 500,
            "date": "2023-08-25",
            "experience": "3-5 years"
        },
        {
            "title": "Front-end Developer",
            "company": "Meta",
            "type": "Internship",
            "salary": 5000,
            "location": "New York, NY",
            "applicants": 200,
            "date": "2023-09-08",
            "experience": "0-1 yrs"
        },
        {
            "title": "Product Manager",
            "company": "Apple",
            "type": "Remote",
            "salary": 200000,
            "location": "Anywhere",
            "applicants": 100,
            "date": "2023-09-15",
            "experience": "5+ years"
        },
        {
            "title": "UI/UX Designer",
            "company": "Netflix",
            "type": "Full-time",
            "salary": 120000,
            "location": "Los Gatos, CA",
            "applicants": 750,
            "date": "2023-09-22",
            "experience": "3-5 years"
        },
        {
            "title": "Cybersecurity Engineer",
            "company": "Microsoft",
            "type": "Permanent",
            "salary": 175000,
            "location": "Redmond, WA",
            "applicants": 400,
            "date": "2023-09-29",
            "experience": "5+ years"
        },
        {
            "title": "Data Analyst",
            "company": "IBM",
            "type": "Part-time",
            "salary": 75000,
            "location": "Chicago, IL",
            "applicants": 300,
            "date": "2023-10-06",
            "experience": "1-2 years"
        },
        {
            "title": "QA Engineer",
            "company": "Oracle",
            "type": "W-2",
            "salary": 100000,
            "location": "Austin, TX",
            "applicants": 250,
            "date": "2023-10-13",
            "experience": "0-1 yrs"
        },
        {
            "title": "DevOps Engineer",
            "company": "Salesforce",
            "type": "Contract-to-hire",
            "salary": 150000,
            "location": "San Francisco, CA",
            "applicants": 100,
            "date": "2023-10-20",
            "experience": "3-5 years"
        },
        {
            "title": "Machine Learning Engineer",
            "company": "Tesla",
            "type": "Remote",
            "salary": 200000,
            "location": "Anywhere",
            "applicants": 75,
            "date": "2023-10-27",
            "experience": "5+ years"
        }
    ]


    return (
        <MotionDiv className='m-4 md:m-16 '>
            <div className='my-14'>
                <div className='w-max'>
                    <RoughNotation type="box" show={true} color='#fdc500'>
                        <h1 className='text-3xl md:text-5xl z-10'>Job Opportunities</h1>
                    </RoughNotation>
                </div>

                <div className='flex md:flex-row flex-col gap-3 my-4'>
                    <input type="text" placeholder='Location' />
                    <input type="text" placeholder='Job' />
                    <select>
                        <option>Remote</option>
                        <option>Hybrid</option>
                        <option>Onsite</option>
                    </select>
                </div>
            </div>
            <div className=' flex flex-col md:flex-row flex-wrap gap-4 items-start justify-start  rounded-lg p-4'>
                {
                    jobDetails ? jobDetails.map((item, index) => (
                        <JobComponent title={item.title}
                            key={index}
                            company={item.company}
                            type={item.type}
                            salary={item.salary} // Provide an appropriate salary value
                            location={item.location}
                            applicants={item.applicants}
                            date={item.date}
                            experience={item.experience} />
                    ))
                        :
                        <h1>No Jobs</h1>
                }
            </div>


        </MotionDiv>
    )
}

export default Home
