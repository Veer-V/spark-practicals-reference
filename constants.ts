import { Practical } from './types';

export const PRACTICALS: Practical[] = [
  {
    id: "practical-1",
    title: "Practical 1",
    subtitle: "Spark Installation (Colab)",
    steps: [
      "Installed Java (OpenJDK 11) required for running Apache Spark.",
      "Downloaded and extracted Apache Spark 3.3.0 with Hadoop support.",
      "Installed PySpark library for running Spark using Python.",
      "Created SparkSession to initialize Spark environment in Colab."
    ],
    code: `!apt-get update -y
!apt-get install -y openjdk-11-jdk-headless
!wget -q https://archive.apache.org/dist/spark/spark-3.3.0/spark-3.3.0-bin-hadoop3.tgz
!tar xf spark-3.3.0-bin-hadoop3.tgz
!pip install -q pyspark

import os
os.environ["JAVA_HOME"] = "/usr/lib/jvm/java-11-openjdk-amd64"
os.environ["SPARK_HOME"] = "/content/spark-3.3.0-bin-hadoop3"

from pyspark.sql import SparkSession

spark = SparkSession.builder \\
    .appName("SPARK PRACTICALS") \\
    .getOrCreate()

spark`
  },
  {
    id: "practical-2",
    title: "Practical 2",
    subtitle: "How to Create an RDD",
    steps: [
      "Create an RDD from a Python list.",
      "Create an RDD by reading a text file.",
      "Created an RDD with a custom number of partitions and verified partition count using getNumPartitions()."
    ],
    code: `numbers = [1, 2, 3, 4, 5]
rdd1 = spark.sparkContext.parallelize(numbers)
print(rdd1.collect())

with open("sample.txt", "w") as f:
    f.write("HELLO\\nTHIS IS SPARK\\nGVP HERE")

rdd2 = spark.sparkContext.textFile("sample.txt")
print(rdd2.collect())

rdd3 = spark.sparkContext.parallelize([10, 20, 30, 40], 2)
print("RDD elements:", rdd3.collect())
print("Number of partitions:", rdd3.getNumPartitions())`
  },
  {
    id: "practical-3",
    title: "Practical 3",
    subtitle: "Transformation and Action on RDD",
    steps: [
      "Created a base RDD from a Python list using parallelize().",
      "Applied map() transformation to square each element of the RDD.",
      "Applied filter() transformation to select only even numbers from the RDD.",
      "Used flatMap() to split each line into multiple words and create a word RDD.",
      "Performed actions like collect(), count(), first(), take() and reduce() on the RDD."
    ],
    code: `numbers = [1, 2, 3, 4, 5, 6]
numbers_rdd = spark.sparkContext.parallelize(numbers)
print(numbers_rdd.collect())

squared_rdd = numbers_rdd.map(lambda x: x * x)
print(squared_rdd.collect())

even_rdd = numbers_rdd.filter(lambda x: x % 2 == 0)
print(even_rdd.collect())

lines = ["hello spark", "welcome to rdd transformations"]
lines_rdd = spark.sparkContext.parallelize(lines)
words_rdd = lines_rdd.flatMap(lambda line: line.split(" "))
print(words_rdd.collect())

print("Collect:", numbers_rdd.collect())
print("Count:", numbers_rdd.count())
print("First element:", numbers_rdd.first())
print("First 3 elements:", numbers_rdd.take(3))

sum_of_numbers = numbers_rdd.reduce(lambda a, b: a + b)
print("Sum of all numbers:", sum_of_numbers)`
  },
  {
    id: "practical-4",
    title: "Practical 4",
    subtitle: "Counting Word Occurrences Using flatMap()",
    steps: [
      "Created an RDD of text lines to perform word count.",
      "Used flatMap() to split each line into individual words.",
      "Mapped each word into a (word, 1) pair for counting.",
      "Applied reduceByKey() to sum word occurrences.",
      "Sorted the final word count results in descending order."
    ],
    code: `lines = [
    "spark makes big data easy",
    "spark runs fast",
    "big data needs spark"
]
lines_rdd = spark.sparkContext.parallelize(lines)
print(lines_rdd.collect())

words_rdd = lines_rdd.flatMap(lambda line: line.split(" "))
print(words_rdd.collect())

word_pairs_rdd = words_rdd.map(lambda word: (word, 1))
print(word_pairs_rdd.collect())

word_counts_rdd = word_pairs_rdd.reduceByKey(lambda a, b: a + b)
print(word_counts_rdd.collect())

sorted_word_counts = word_counts_rdd.sortBy(lambda x: x[1], ascending=False)
print(sorted_word_counts.collect())`
  },
  {
    id: "practical-5",
    title: "Practical 5",
    subtitle: "Executing SQL Commands and Functions on a DataFrame",
    steps: [
      "Created a DataFrame using sample rows containing id, name, age and city.",
      "Registered the DataFrame as a temporary SQL view named 'people'.",
      "Executed a SQL SELECT query to display all records.",
      "Used SQL WHERE clause to filter records with age greater than 25.",
      "Applied SQL GROUP BY and COUNT() to find number of people in each city.",
      "Used ORDER BY to sort records in descending order of age."
    ],
    code: `from pyspark.sql import SparkSession
from pyspark.sql import Row

data = [
    Row(id=1, name="Amit", age=22, city="Mumbai"),
    Row(id=2, name="Riya", age=25, city="Delhi"),
    Row(id=3, name="Karan", age=28, city="Mumbai"),
    Row(id=4, name="Sara", age=30, city="Pune")
]

df = spark.createDataFrame(data)
df.show()

df.createOrReplaceTempView("people")

spark.sql("SELECT * FROM people").show()

spark.sql("SELECT name, city FROM people WHERE age > 25").show()

spark.sql("SELECT city, COUNT(*) AS count FROM people GROUP BY city").show()

spark.sql("SELECT name, age FROM people ORDER BY age DESC").show()`
  },
  {
    id: "practical-6",
    title: "Practical 6",
    subtitle: "Customer with DataFrames",
    steps: [
      "Created a Customer DataFrame with columns like cust_id, name, age, city and amount.",
      "Displayed the schema of the Customer DataFrame using printSchema().",
      "Selected specific columns from the Customer DataFrame using select().",
      "Filtered customers whose amount is greater than 1800 using filter().",
      "Added a new column discounted_amount using withColumn() and an expression.",
      "Grouped customers by city and calculated total amount using groupBy() and agg().",
      "Sorted the Customer DataFrame in descending order of amount using orderBy()."
    ],
    code: `from pyspark.sql import Row

customers = [
    Row(cust_id=1, name="Amit", age=23, city="Mumbai", amount=1500),
    Row(cust_id=2, name="Riya", age=29, city="Delhi", amount=2300),
    Row(cust_id=3, name="Karan", age=35, city="Mumbai", amount=1200),
    Row(cust_id=4, name="Neha", age=31, city="Pune", amount=1800),
    Row(cust_id=5, name="Suresh", age=40, city="Delhi", amount=2600),
]

cust_df = spark.createDataFrame(customers)
cust_df.show()

cust_df.printSchema()

cust_df.select("cust_id", "name", "city").show()

cust_df.filter(cust_df["amount"] > 1800).show()

from pyspark.sql.functions import col

discounted_df = cust_df.withColumn("discounted_amount", col("amount") * 0.9)
discounted_df.show()

from pyspark.sql.functions import sum as _sum

city_total_df = cust_df.groupBy("city").agg(_sum("amount").alias("total_amount"))
city_total_df.show()

cust_df.orderBy(col("amount").desc()).show()`
  },
  {
    id: "practical-7",
    title: "Practical 7",
    subtitle: "Use Broadcast Variables",
    steps: [
      "Created a Python dictionary containing movie IDs and their corresponding names.",
      "Broadcasted the movie dictionary so all executors can access it efficiently.",
      "Created an RDD containing movie IDs along with ratings.",
      "Used broadcast variable inside map() to map movie IDs to their names.",
      "Printed final (movie name, rating) pairs after replacing IDs with names."
    ],
    code: `movie_names = {
    101: "Inception",
    102: "Interstellar",
    103: "The Dark Knight",
    104: "Avatar",
    105: "Titanic"
}

broadcast_movie_names = spark.sparkContext.broadcast(movie_names)

ratings = [
    (101, 5),
    (102, 4),
    (103, 5),
    (104, 3),
    (105, 4),
    (103, 5),
    (101, 4)
]

ratings_rdd = spark.sparkContext.parallelize(ratings)
print(ratings_rdd.collect())

movie_name_rdd = ratings_rdd.map(
    lambda x: (broadcast_movie_names.value[x[0]], x[1])
)

print(movie_name_rdd.collect())

for movie in movie_name_rdd.collect():
    print(movie)`
  },
  {
    id: "practical-8",
    title: "Practical 8",
    subtitle: "Create Similar Movies from One Million Rating",
    steps: [
      "Created a user-movie rating DataFrame with columns userId, movieId and rating.",
      "Joined the ratings table with itself to get movie pairs rated by the same user.",
      "Grouped movie pairs and calculated count and sum statistics needed for similarity.",
      "Computed cosine similarity score for each movie pair using the rating statistics.",
      "Filtered pairs with enough common ratings and displayed most similar movie pairs."
    ],
    code: `from pyspark.sql import Row

ratings_data = [
    Row(userId=1, movieId=101, rating=4.0),
    Row(userId=1, movieId=102, rating=5.0),
    Row(userId=1, movieId=103, rating=3.0),
    Row(userId=2, movieId=101, rating=5.0),
    Row(userId=2, movieId=102, rating=4.0),
    Row(userId=2, movieId=104, rating=2.0),
    Row(userId=3, movieId=101, rating=4.0),
    Row(userId=3, movieId=103, rating=4.0),
    Row(userId=3, movieId=105, rating=5.0),
    Row(userId=4, movieId=102, rating=4.0),
    Row(userId=4, movieId=103, rating=2.0),
    Row(userId=4, movieId=104, rating=3.0),
]

ratings_df = spark.createDataFrame(ratings_data)
ratings_df.show()

from pyspark.sql.functions import col

movie_pairs = ratings_df.alias("r1").join(
    ratings_df.alias("r2"),
    (col("r1.userId") == col("r2.userId")) & (col("r1.movieId") < col("r2.movieId"))
).select(
    col("r1.userId").alias("userId"),
    col("r1.movieId").alias("movie1"),
    col("r2.movieId").alias("movie2"),
    col("r1.rating").alias("rating1"),
    col("r2.rating").alias("rating2")
)

movie_pairs.show()

from pyspark.sql.functions import sum as _sum, count as _count

pair_stats = movie_pairs.groupBy("movie1", "movie2").agg(
    _count("*").alias("num_pairs"),
    _sum(col("rating1") * col("rating1")).alias("sum_xx"),
    _sum(col("rating2") * col("rating2")).alias("sum_yy"),
    _sum(col("rating1") * col("rating2")).alias("sum_xy")
)

pair_stats.show()

from pyspark.sql.functions import sqrt, col

similarity_df = pair_stats.withColumn(
    "similarity",
    col("sum_xy") / (sqrt(col("sum_xx")) * sqrt(col("sum_yy")))
)

similarity_df.show()

similar_movies = similarity_df.filter(col("num_pairs") >= 2) \\
    .orderBy(col("similarity").desc())

similar_movies.show()`
  },
  {
    id: "practical-9",
    title: "Practical 9",
    subtitle: "Statistical Operations on a DataFrame",
    steps: [
      "Created an Employee DataFrame with numeric columns like age and salary.",
      "Used describe() to get count, mean, min and max for age and salary.",
      "Applied aggregate functions like AVG, MIN, MAX, SUM and STDDEV on salary column.",
      "Calculated average salary for each age group using groupBy() and avg().",
      "Computed correlation between age and salary using corr() function."
    ],
    code: `from pyspark.sql import Row

employees = [
    Row(emp_id=1, name="Amit", age=23, salary=30000.0),
    Row(emp_id=2, name="Riya", age=29, salary=45000.0),
    Row(emp_id=3, name="Karan", age=35, salary=60000.0),
    Row(emp_id=4, name="Neha", age=31, salary=52000.0),
    Row(emp_id=5, name="Suresh", age=40, salary=75000.0),
]

emp_df = spark.createDataFrame(employees)
emp_df.show()

emp_df.describe(["age", "salary"]).show()

from pyspark.sql.functions import avg, min, max, sum, stddev

emp_df.select(
    avg("salary").alias("avg_salary"),
    min("salary").alias("min_salary"),
    max("salary").alias("max_salary"),
    sum("salary").alias("total_salary"),
    stddev("salary").alias("stddev_salary")
).show()

from pyspark.sql.functions import round as _round

age_avg_salary = emp_df.groupBy("age").agg(
    _round(avg("salary"), 2).alias("avg_salary_by_age")
)
age_avg_salary.show()

from pyspark.sql.functions import corr

corr_df = emp_df.select(corr("age", "salary").alias("age_salary_correlation"))
corr_df.show()`
  },
  {
    id: "practical-10",
    title: "Practical 10",
    subtitle: "Using Spark ML to Produce Movie Recommendations",
    steps: [
      "Loaded movie rating data into a DataFrame for training.",
      "Split the dataset into training and testing sets.",
      "Created an ALS (Alternating Least Squares) recommendation model.",
      "Trained the ALS model using the training data.",
      "Predicted ratings on the test data using the trained model.",
      "Generated top movie recommendations for each user."
    ],
    code: `from pyspark.sql import Row

ratings_data = [
    Row(userId=1, movieId=101, rating=4.0),
    Row(userId=1, movieId=102, rating=5.0),
    Row(userId=2, movieId=101, rating=3.0),
    Row(userId=2, movieId=103, rating=4.0),
    Row(userId=3, movieId=102, rating=2.0),
    Row(userId=3, movieId=103, rating=5.0),
    Row(userId=4, movieId=101, rating=4.0),
    Row(userId=4, movieId=104, rating=3.0),
]

ratings_df = spark.createDataFrame(ratings_data)
ratings_df.show()

train_df, test_df = ratings_df.randomSplit([0.8, 0.2])

from pyspark.ml.recommendation import ALS

als = ALS(
    userCol="userId",
    itemCol="movieId",
    ratingCol="rating",
    nonnegative=True,
    coldStartStrategy="drop"
)

model = als.fit(train_df)

predictions = model.transform(test_df)
predictions.show()

user_recommendations = model.recommendForAllUsers(3)
user_recommendations.show(truncate=False)`
  }
];