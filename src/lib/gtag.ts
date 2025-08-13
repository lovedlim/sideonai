// Google Analytics 이벤트 추적 유틸리티

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: {
        [key: string]: string | number | boolean;
      }
    ) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// 페이지뷰 추적
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// 이벤트 추적
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    const config: { [key: string]: string | number | boolean } = {
      event_category: category,
    };
    
    if (label) {
      config.event_label = label;
    }
    
    if (value !== undefined) {
      config.value = value;
    }
    
    window.gtag('event', action, config);
  }
};

// 사전 정의된 이벤트들
export const trackButtonClick = (buttonName: string, location: string) => {
  event({
    action: 'click',
    category: 'Button',
    label: `${buttonName} - ${location}`,
  });
};

export const trackFormSubmit = (formName: string) => {
  event({
    action: 'submit',
    category: 'Form',
    label: formName,
  });
};

export const trackCourseView = (courseName: string) => {
  event({
    action: 'view',
    category: 'Course',
    label: courseName,
  });
};

export const trackContactClick = (contactType: string) => {
  event({
    action: 'click',
    category: 'Contact',
    label: contactType,
  });
};
