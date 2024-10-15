import { useEffect, useState } from 'react';

type Heading = {
  level: number;
  text: string | null;
  scrollPosition: number;
};

function App() {
  const [headingList, setHeadingList] = useState<Heading[]>([]);

  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    const headings = mainContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingList = Array.from(headings).map((heading) => {
      return {
        level: Number(heading.tagName.slice(1)),
        text: heading.textContent,
        scrollPosition: heading.getBoundingClientRect().top,
      };
    });
    setHeadingList(headingList);
  }, []);

  const handleClickHeading = (scrollPosition: number) => {
    const { scrollY } = window;
    window.scrollTo({
      top: scrollPosition - (scrollPosition < scrollY ? 90 : 40),
      behavior: 'smooth',
    });
  };

  if (headingList.length === 0) return null;

  return (
    <div className="side-table-of-contents">
      {headingList.map((heading) => (
        <div
          key={heading.text}
          className="side-table-of-contents__item"
          style={{ paddingLeft: `${heading.level * 10}px` }}
        >
          <a
            className="side-table-of-contents__link"
            onClick={() => handleClickHeading(heading.scrollPosition)}
          >
            {heading.text}
          </a>
        </div>
      ))}
    </div>
  );
}

export default App;
