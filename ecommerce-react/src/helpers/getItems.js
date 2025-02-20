export const getProductsFirebase = (db, setProducts, collection, getDocs) => {
  const itemsCollection = collection(db, "items");
  getDocs(itemsCollection).then((snapshop) => {
    if (snapshop.size === 0) console.log("No results");
    setProducts(snapshop.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  });
};

export const getProductsByIDFirebase = (
  db,
  setItem,
  productId,
  doc,
  getDoc
) => {
  const itemRef = doc(db, "items", productId);
  getDoc(itemRef).then((snapshop) => {
    if (!snapshop.exists()) setItem("false");
    else setItem({ id: snapshop.id, ...snapshop.data() });
  });
};

export const getProductsByCategoryFirebase = (
  db,
  setItemsByCategory,
  categoryID,
  collection,
  getDocs,
  query,
  where
) => {
  // MODIFICAR LA CATEGORIA PARA RECIBIR EL ITEM
  const q = query(collection(db, "items"), where("category", "==", categoryID));

  getDocs(q).then((snapshop) => {
    if (snapshop.size === 0) {
      setItemsByCategory("false");
      return;
    }
    setItemsByCategory(
      snapshop.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  });
};

export const getCategoryFirebase = (db, setCategories, collection, getDocs) => {
  const categoryCollection = collection(db, "category");
  getDocs(categoryCollection).then((snapshop) => {
    if (snapshop.size === 0) console.log("No results");
    setCategories(snapshop.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  });
};

export const setOrderFinished = async (
  db,
  addDoc,
  collection,
  name,
  lastName,
  email,
  address,
  total,
  totalProducts,
  addCheckout
) => {
  const fullName = `${name} ${lastName}`;
  const docData = {
    address,
    email,
    fullName,
    total,
    totalProducts,
  };
  addCheckout(docData);
  await addDoc(collection(db, "purchasing"), docData);
};

export const getIDFirebase = async (
  db,
  collection,
  getDocs,
  query,
  where,
  email,
  setID
) => {
  const q = query(collection(db, "purchasing"), where("email", "==", email));

  const querySnapshop = await getDocs(q);
  setID(querySnapshop.docs[0].id);
};
