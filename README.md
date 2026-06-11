 🌱 AgriMsaada – Smart Agricultural Advisory System

AgriMsaada is a multi-channel agricultural support platform designed to empower small-scale farmers in Kiambu and Murang’a, Kenya. The system delivers data-driven insights through a Progressive Web App (PWA), USSD, and SMS, ensuring accessibility for both smartphone and feature phone users.

Project Objective

AgriMsaada aims to:

* Provide **real-time weather updates**
* Recommend **suitable crops and livestock** based on location and conditions
* Detect **crop and livestock diseases** using symptom input
* Track **farm productivity and growth**
* Deliver **actionable farming advice** (irrigation, spraying, feeding)
* Connect farmers to **markets and veterinary services**
* Support **offline-friendly access via USSD and SMS**

System Architecture

User (PWA / USSD / SMS)
        ↓
Backend API (Node.js / Django)
        ↓
External APIs (Weather, Soil, Market Data)
        ↓
Database (PostgreSQL / Firebase)
        ↓
Recommendation Engine
        ↓
Output:
  - Mobile/Web Dashboard
  - SMS Alerts
  - USSD Responses

Core Components

1. Progressive Web App (PWA)

* User authentication (login/register)
* Profile setup (location, farming type)
* Dashboard:

  * Weather forecasts
  * Farm insights and tasks
* Features:

  * Crop/livestock tracking
  * Symptom input for disease detection
  * Recommendations (irrigation, feeding, spraying)
* Market insights (price trends, best selling periods)

2. Web Admin Dashboard

* Farmer management
* System monitoring & analytics
* Disease outbreak tracking
* SMS campaign management
* API integration controls


3. USSD Integration

Accessible via feature phones:

*123#
1. Register
2. Weather Updates
3. Farming Advice
4. Report Problem


Capabilities:
* Farmer registration
* Weather requests
* Guided symptom reporting
* Basic recommendations


4. SMS Notification System

Automated alerts for:

* Daily weather forecasts (morning, afternoon, evening)
* Farming tips (irrigation, spraying, harvesting)
* Disease outbreak warnings

Tech Stack

**Frontend**

* Flutter (PWA / Mobile)

**Backend**

* Node.js (Express) or Django

**Database**

* PostgreSQL / Firebase Firestore

**Integrations**

* Africa’s Talking (SMS & USSD)
* OpenWeatherMap / Tomorrow.io (Weather APIs)
* Google Maps API (Geolocation)

**Infrastructure**

* AWS / Firebase / Render
* Redis (for background jobs like SMS scheduling)

---

5. Database Overview

The system stores:

* Farmer profiles (location, farming type)
* Crop and livestock data
* Planting dates and production logs
* Weather data (cached)
* Disease reports
* Market price data
* SMS and USSD logs

Core Features

**Location-Based Recommendations

* Suggests suitable crops/livestock using:

  * Weather patterns
  * Soil conditions
  * Regional data


Disease Detection

* Farmers input symptoms
* System predicts:

  * Possible disease
  * Recommended treatment
  * Vet consultation options

Farm Tracking

* Tracks crop lifecycle from planting to harvest
* Monitors livestock productivity (e.g., milk yield)
* Provides actionable advice at each stage

Market Insights

* Displays price trends
* Suggests optimal selling times
* Helps maximize farmer profits


Security

* JWT-based authentication
* Input validation (especially USSD flows)
* Secure API endpoints
* Encrypted sensitive data


Testing Strategy

* USSD session flow testing
* SMS delivery validation
* GPS accuracy checks
* Disease prediction validation

Development Roadmap

Phase 1 (MVP)

* User authentication
* Weather integration
* SMS alerts

Phase 2

* Crop & livestock tracking
* USSD integration

Phase 3

* Disease detection
* Market insights

Phase 4**

* AI-powered recommendations
* Advanced analytics dashboard

Project Status

🚧 In Development (MVP Phase)


AgriMsaada aims to:

* Improve decision-making for farmers
* Increase agricultural productivity
* Reduce losses from weather and disease
* Bridge the digital gap in rural farming communities


Contributing
Contributions are welcome. Please fork the repository and submit a pull request.
 **License**

This project is licensed under the MIT License.

