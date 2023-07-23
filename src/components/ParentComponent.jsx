import styles from "./ParentComponent.module.css";
import ChildComponent from "./childComponent";

function ParentComponent() {
  const dataList = [
    {
      id: 1,
      name: "Elemento muy importante a tener en cuenta 1",
      description: "description my larga que se alarga mucho si... mucchooo 1",
      duration: "1hora 31 minutos",
    },
    {
      id: 2,
      name: "Elemento dsfasdfasdfas 2",
      description: "description my larga que se alarga mucho si... mucchooo 2",
      duration: "1hora 32 minutos",
    },
    {
      id: 3,
      name: "Elemento aaaaaaaaaaaaaaaa 3",
      description: "description my larga que se alarga mucho si... mucchooo 3",
      duration: "1hora 33 minutos",
    },
    {
      id: 4,
      name: "Elemento cccccccccc 4",
      description: "description my larga que se alarga mucho si... mucchooo 4",
      duration: "1hora 34 minutos",
    },
    {
      id: 5,
      name: "Elemento kkkkkkkkkkkk 5",
      description: "description my larga que se alarga mucho si... mucchooo 5",
      duration: "1hora 35 minutos",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.name}>NAME</div>
        <div className={styles.description}>DESCRIPTION</div>
        <div className={styles.duration}>DURATION</div>
      </div>
      {/* Usamos map para crear una lista de elementos en fila */}
      {dataList.map((item) => (
        <ChildComponent
          key={item.id}
          name={item.name}
          description={item.description}
          duration={item.duration}
        />
      ))}
    </div>
  );
}

export default ParentComponent;
