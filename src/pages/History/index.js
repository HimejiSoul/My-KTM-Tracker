import React,{Component} from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';

class YourComponent extends Component {
  
  state = {
    data: []
  };

  fetchData= async()=>{
    const response = await fetch('http://192.168.1.10:3000/history');
    const users = await response.json();
    this.setState({data: users});
  }

  componentDidMount() {
    this.fetchData();
    this.interval = setInterval(() => {
      this.fetchData();
    }, 5000); // Refresh data every 5 seconds
  }

  componentWillUnmount() {
    clearInterval(this.interval); // Clear the interval when the component unmounts
  }

  render() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const dataBySection = {};
    
    this.state.data.forEach((item) => {
      const itemDate = new Date(item.time);
      let sectionTitle;
    
      if (itemDate.toDateString() === today.toDateString()) {
        sectionTitle = 'Today';
      } else if (itemDate.toDateString() === yesterday.toDateString()) {
        sectionTitle = 'Yesterday';
      } else {
        sectionTitle = itemDate.toLocaleDateString();
      }
    
      if (!dataBySection[sectionTitle]) {
        dataBySection[sectionTitle] = [];
      }
    
      dataBySection[sectionTitle].push(item);
    }); 


    const sections = Object.keys(dataBySection).map((key) => ({
      title: key,
      data: dataBySection[key],
    }));
  
    return (
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.h1}>History</Text>
      </View>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => index.toString()}
          renderSectionHeader={({section: {title}}) => (
            <View style={styles.section}>
              <Text style={styles.h2}>{title}</Text>
            </View>
          )}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.place}</Text>
              <Text style={styles.subtitle}>{item.time.replace('T', ' ').replace('Z', ' ').slice(11, 16)}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}  

export default YourComponent;

const styles = StyleSheet.create({
  //c
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    // paddingTop: StatusBar.currentHeight,
  },

  //h
  h1: {
    color: '#372F2F',
    fontSize: 22,
    fontWeight: '500',
  },
  h2: {
    color: '#645D5D',
    fontSize: 20,
    fontWeight: '500',
  },
  header: {
    // backgroundColor: 'grey',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15,
  },

  //i
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },

  //s
  section: {
    borderTopColor: '#CDC5C5', // Color of the border
    borderTopStyle: 'solid',
    borderTopWidth: 1, // Width of the border
    marginTop: -2,
    paddingTop: 20,
  },
  subtitle: {
    color: '#7D7676',
    fontSize: 14,
  },

  //t
  title: {
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 8,
    color:'black'
  }
});
