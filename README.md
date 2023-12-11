# Inheritance issue reproduction

Although it's not actually related to inheritance at all!

## What

If an `INSERT` update contains a resource with multiple classes of which only one is writeable according to the `mu-authorization` configuration, it will only succeed if it's the last class to appear in the update.

## Reproduction steps

- Clone this repository: `git clone git@github.com:sergiofenoll/inheritance-issue.git`
- Up the Docker containers using `docker compose`: `cd inheritance-issue; docker compose up -d`
- Start the frontend with a simple reproduction: `cd frontends/inheritance-frontend; eds -n=inheritance-issue_default --proxy=http://identifier`
- Start the frontend for the `debug-auth-headers` service: `cd frontends/debug-auth-headers-frontend;EDI_EMBER_VERSION="3.15.1" eds -n=inheritance-issue_default --proxy=http://identifier --port=4300 --live-reload-port=49153`
- Go to http://localhost:4200, open your Network tab in the your development console and click the `Create AJob` button. Observe that the call fails and feel free to look at the mu-authorization logs. Observe that the executed query is trying to insert a resource with classes `ext:AJob`, `ext:Job` (in that order), and fails.
- Go to http://localhost:4200 and execute the following update (and ignore the response body, it's lying):

``` sparql
PREFIX mu: <http://mu.semte.ch/vocabularies/core/>
PREFIX ext: <http://mu.semte.ch/vocabularies/ext/>
INSERT DATA 
{
  GRAPH <http://mu.semte.ch/application> {
    <http://mu.semte.ch/data/ext/AJob/65776D7474673D0EBBCEAD0A> mu:uuid """65776D7474673D0EBBCEAD0A""".
    <http://mu.semte.ch/data/ext/AJob/65776D7474673D0EBBCEAD0A> a ext:AJob.
    <http://mu.semte.ch/data/ext/AJob/65776D7474673D0EBBCEAD0A> a ext:Job.
  }
}
```
- Execute the following query and observe that the response contains no bindings:

``` sparql
SELECT DISTINCT ?s ?p ?o
WHERE {
  ?s ?p ?o
}
```

- Now execute the following update:

``` sparql
PREFIX mu: <http://mu.semte.ch/vocabularies/core/>
PREFIX ext: <http://mu.semte.ch/vocabularies/ext/>
INSERT DATA 
{
  GRAPH <http://mu.semte.ch/application> {
    <http://mu.semte.ch/data/ext/AJob/65776D7474673D0EBBCEAD0A> mu:uuid """65776D7474673D0EBBCEAD0A""".
    <http://mu.semte.ch/data/ext/AJob/65776D7474673D0EBBCEAD0A> a ext:Job.
    <http://mu.semte.ch/data/ext/AJob/65776D7474673D0EBBCEAD0A> a ext:AJob.
  }
}
```
- Finally, verify the output of the query again and verify that this time the response contains bindings.

``` sparql
SELECT DISTINCT ?s ?p ?o
WHERE {
  ?s ?p ?o
}
```
