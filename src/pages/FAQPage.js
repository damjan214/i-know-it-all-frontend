import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import hamburgerIcon from '../images/menu.png';
import userIcon from '../images/user.png';
import Chatbot from '../components/Chatbox';
import '../styles/OrganizationPage.css';
import '../styles/FAQPage.css'; // <-- import new CSS

function FAQPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const [isManager, setIsManager] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleLogout = () => {
    navigate('/login');
  };

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:8080/api/users/name/${user}`)
        .then(res => {
          if (res.data.userType === 'MANAGER') setIsManager(true);
          setUserId(res.data.id);
        })
        .catch(err => console.error('User type fetch error:', err));
    }
  }, [user]);

  const faqData = [
    {
      section: 'General Information',
      items: [
        {
          question: 'What’s the main purpose of “I Know It All”?',
          answer:
            'Our platform is here to make learning at work faster, easier, and more accessible. Instead of digging through documents or waiting for help, employees can find exactly what they need — when they need it — through smart search, personalized courses, and role-based content. It’s all about empowering people to solve problems and grow without delays.'
        },
        {
          question: 'How does the app keep content fresh and relevant?',
          answer:
            'Course owners — typically managers or training leads — are in charge of updating content. The system also helps by showing the most recently updated and frequently used resources first. If something’s outdated, it can be flagged or archived to keep things clean.'
        },
        {
          question: 'Does the app track performance too, or just learning?',
          answer:
            'While the main focus is learning, the platform does track things like course completions and time spent. It’s not a performance review tool, but those insights can help teams see where skills are growing or where more support might be needed.'
        }
      ]
    },
    {
      section: 'For Employees',
      items: [
        {
          question: 'I’m new and overwhelmed. How can this help me get up to speed?',
          answer:
            'We’ve got you covered. The app is built to make onboarding smoother. You’ll find step-by-step training tailored to your role and department, so you can settle in without constantly needing to ask someone for help. Search for what you need, learn at your own pace, and check off progress as you go.'
        },
        {
          question: 'What if I can’t find the course or info I’m looking for?',
          answer:
            'Try searching with broader terms — for example, “presentation” instead of “PowerPoint.” You can also filter by topic, department, or skill level. If it’s still not there, you can request it through your manager or training team using the feedback form.'
        },
        {
          question: 'Can I go back and retake a course I’ve already finished?',
          answer:
            'Absolutely. You can revisit any course at any time — whether you want a refresher or want to review updates. Your completion badge stays in place.'
        },
        {
          question: 'Will I earn any kind of certificate or recognition?',
          answer:
            'That depends on your company’s setup. Some teams give digital badges or internal certificates when courses are completed. You’ll usually see this in your profile or be notified when it applies.'
        },
        {
          question: 'Does the system suggest new courses to me automatically?',
          answer:
            'Yes. Based on your job role, past learning activity, and interests, the app will recommend relevant new content to keep your skills sharp and growing.'
        }
      ]
    },
    {
      section: 'For Managers',
      items: [
        {
          question: 'How can I tell if my team is actually using the training I upload?',
          answer:
            'You’ll have access to a dashboard that shows who’s viewed, started, or completed each course. You can also set deadlines, send reminders, and even recognize top learners to keep engagement high.'
        },
        {
          question: 'Do I need approval to upload a course?',
          answer:
            'That depends on your company’s rules. Some allow instant publishing; others have a quick review step. Either way, the goal is to make sure everything is accurate, useful, and aligned with your team’s needs.'
        },
        {
          question: 'Can I target courses to specific people or teams?',
          answer:
            'Yes! During upload, you can tag content by department, job title, skill level, or topic. That way, only the right audience sees it in their dashboard.'
        },
        {
          question: 'Can other managers collaborate with me on a course?',
          answer:
            'Currently, only the person who uploads the course can edit it. Others can view it, copy it, and tweak their own versions — and full collaboration features are on the roadmap.'
        }
      ]
    },
    {
      section: 'Technical & Usability',
      items: [
        {
          question: 'Can I upload videos or quizzes as part of the course?',
          answer:
            'Definitely. You can upload videos (MP4), PDFs, docs, and more. While quizzes aren’t built into the app just yet, many teams link out to tools like Google Forms or SurveyMonkey for assessments.'
        },
        {
          question: 'Can I use the app offline?',
          answer:
            'Not yet. The platform runs in your browser and needs an internet connection to work. Offline access is being considered for future versions, especially for mobile.'
        },
        {
          question: 'What if my browser crashes — will I lose my progress?',
          answer:
            'Nope. Your progress is saved automatically to the cloud as you go. If something interrupts your session, you’ll pick up right where you left off when you log back in.'
        },
        {
          question: 'Is the app accessible for people with disabilities?',
          answer:
            'Yes. We follow accessibility best practices — including large clickable areas, clear fonts, and compatibility with screen readers. Voice commands and keyboard shortcuts are also in development to make it even more inclusive.'
        }
      ]
    },
    {
      section: 'Privacy & Data Security',
      items: [
        {
          question: 'Who can see my training progress or profile info?',
          answer:
            'Only you, your direct manager (if applicable), and approved system admins. Your activity isn’t shared with anyone outside your department or company.'
        },
        {
          question: 'Is my personal data protected?',
          answer:
            'Yes. We follow strict data protection standards, including GDPR and CCPA. You can request to view, update, or delete your data at any time, and we never share your info with third parties.'
        }
      ]
    }
  ];

  const toggleExpand = (section, idx) => {
    setExpandedSections(prev => {
      const key = `${section}-${idx}`;
      return { ...prev, [key]: !prev[key] };
    });
  };

  return (
    <div className="main-layout">
      <Chatbot />

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="sidebar-inner p-4">
          <nav className="nav flex-column">
            <Link className="nav-link" to="/main">Home</Link>
            <Link className="nav-link" to="/organization">People & groups</Link>
            <Link className="nav-link" to="/modules">My courses</Link>
            <Link className="nav-link active" to="/faq">FAQs</Link>
            {isManager && <Link className="nav-link" to="/uploads">My uploads</Link>}
          </nav>
        </div>
      )}

      {/* Main content */}
      <div className="faq-page-container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <img
              src={hamburgerIcon}
              alt="menu"
              className="hamburger-icon"
              style={{ cursor: 'pointer' }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
            <h4 style={{ marginLeft: 16, color: '#6b4eff', fontWeight: '700' }}>I Know It All</h4>
          </div>
          <div
            className="user-dropdown-wrapper"
            onClick={() => setShowDropdown(prev => !prev)}
          >
            <img src={userIcon} alt="User" className="user-icon" />
            {showDropdown && (
              <div className="dropdown-menu-user">
                <Link to="/account" className="dropdown-item">My Account</Link>
                <div
                  className="dropdown-item logout-item"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FAQ Content */}
        <h2 className="faq-header">❓ Frequently Asked Questions</h2>
        {faqData.map(({ section, items }) => (
          <div key={section} className="faq-section">
            <h3 className="faq-section-title">{section}</h3>
            {items.map(({ question, answer }, idx) => {
              const key = `${section}-${idx}`;
              const isExpanded = expandedSections[key];
              return (
                <div
                  key={key}
                  className="faq-card"
                  onClick={() => toggleExpand(section, idx)}
                  aria-expanded={isExpanded}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') toggleExpand(section, idx);
                  }}
                >
                  <p className="faq-question">
                    <span>Q: {question}</span>
                    <span className="faq-toggle-icon">{isExpanded ? '−' : '+'}</span>
                  </p>
                  <div className={`faq-answer-wrapper ${isExpanded ? 'expanded' : ''}`}>
                    <p className="faq-answer"><strong>A:</strong> {answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQPage;
