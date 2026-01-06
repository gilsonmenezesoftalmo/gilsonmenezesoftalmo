import { useEffect } from 'react';
import { CONTACT } from '@/lib/contact';

const DoctoraliaWidget = () => {
  useEffect(() => {
    // Load Doctoralia widget script
    const scriptId = 'zl-widget-s';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = '//platform.docplanner.com/js/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <a
      id="zl-url"
      className="zl-url"
      href={CONTACT.doctoralia}
      rel="nofollow"
      data-zlw-doctor={CONTACT.doctoraliaDoctor}
      data-zlw-type="big"
      data-zlw-opinion="true"
      data-zlw-hide-branding="true"
      data-zlw-saas-only="true"
      data-zlw-a11y-title="Widget de marcação de consultas médicas"
    >
      Gilson de Santana Menezes Junior - Doctoralia.com.br
    </a>
  );
};

export default DoctoraliaWidget;
